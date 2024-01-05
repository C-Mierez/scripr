import { TRPCError } from "@trpc/server";
import { PasswordResetSchema, ResetSchema, SignUpSchema, VerificationTokenSchema } from "schemas";
import {
    createPasswordResetTokenForEmail,
    createUser,
    createVerificationTokenForEmail,
    deletePasswordResetTokenById,
    deleteVerificationTokenById,
    getPasswordResetTokenByToken,
    getUserByEmail,
    getVerificationTokenByToken,
    updateUserPasswordById,
    verifyUser,
} from "~/server/db/queries";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendPasswordResetEmail, sendVerificationEmail } from "~/server/mail";
import { hashNewPassword } from "~/server/generator";

export const authRouter = createTRPCRouter({
    signUp: publicProcedure.input(SignUpSchema).mutation(async ({ ctx, input }) => {
        // Confirm the email address is not already in use
        const existingEmail = await getUserByEmail(ctx.db, input.email);
        if (existingEmail) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Email address already in use.",
            });
        }
        /* ------------------------------ Checks Passed ----------------------------- */
        // Hash inputted password
        const { hashedPassword, generatedSalt } = await hashNewPassword(input.password);

        // Create the new user
        await createUser(ctx.db, {
            email: input.email,
            passwordHash: hashedPassword,
            passwordSalt: generatedSalt,
            name: input.username,
        });

        // Generate a verification token for the user
        const verificationToken = await createVerificationTokenForEmail(ctx.db, { email: input.email });

        // Send the verification email
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {
            email: verificationToken.email,
        };
    }),
    verifyEmail: publicProcedure.input(VerificationTokenSchema).mutation(async ({ ctx, input }) => {
        // Get the verification token
        const verificationToken = await getVerificationTokenByToken(ctx.db, input.token);

        // If the token does not exist, throw an error
        if (!verificationToken) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid verification token.",
            });
        }

        // Check the expiration date
        if (new Date(verificationToken.expiresAt) < new Date()) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Verification token has expired.",
            });
        }

        // Check that the user associated with the token exists
        const user = await getUserByEmail(ctx.db, verificationToken.email);
        if (!user) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "The email associated to this verification token does not exist.",
            });
        }

        // Update the user's emailVerified status
        // We update the email as well, so this procedure can be used for email changes too
        const newEmail = verificationToken.email;
        await verifyUser(ctx.db, { id: user.id, newEmail });

        // Delete the verification token
        await deleteVerificationTokenById(ctx.db, verificationToken.id);

        return {
            email: newEmail,
        };
    }),
    requestPasswordReset: publicProcedure.input(ResetSchema).mutation(async ({ ctx, input }) => {
        // Get the user
        const fetchedUser = await getUserByEmail(ctx.db, input.email);

        // If the user does not exist, throw an error
        if (!fetchedUser) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Email not found.",
            });
        }

        // If the user is oauth or has not been verified, throw an error
        if (!fetchedUser.passwordHash || !fetchedUser.emailVerified) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Password reset not permitted for this email.",
            });
        }

        // Generate a verification token for the user
        const passwordResetToken = await createPasswordResetTokenForEmail(ctx.db, { email: input.email });

        // Send the verification email
        await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

        return {
            email: fetchedUser.email,
        };
    }),
    resetPassword: publicProcedure.input(PasswordResetSchema).mutation(async ({ ctx, input }) => {
        // Get the password reset token
        const passwordResetToken = await getPasswordResetTokenByToken(ctx.db, input.token);

        // If the token does not exist, throw an error
        if (!passwordResetToken) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid password reset token.",
            });
        }

        // Check the expiration date
        if (new Date(passwordResetToken.expiresAt) < new Date()) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Password reset token has expired.",
            });
        }

        // Check that the user associated with the token exists
        const user = await getUserByEmail(ctx.db, passwordResetToken.email);
        if (!user) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "The email associated to this password reset token does not exist.",
            });
        }

        // Hash inputted password
        const { hashedPassword, generatedSalt } = await hashNewPassword(input.password);

        // Update the user's password
        await updateUserPasswordById(ctx.db, {
            id: user.id,
            passwordHash: hashedPassword,
            passwordSalt: generatedSalt,
        });

        // Delete the password reset token
        await deletePasswordResetTokenById(ctx.db, passwordResetToken.id);

        return {
            email: user.email,
        };
    }),
});

// https://trpc.io/docs/server/error-handling
