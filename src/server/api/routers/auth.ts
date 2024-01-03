import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "schemas";
import { createUser, createVerificationTokenForEmail, getUserByEmail } from "~/server/db/queries";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
        const generatedSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, generatedSalt);
        // Create the new user
        await createUser(ctx.db, {
            email: input.email,
            passwordHash: hashedPassword,
            passwordSalt: generatedSalt,
            name: input.username,
        });

        // Generate a verification token for the user
        const verificationToken = await createVerificationTokenForEmail(ctx.db, { email: input.email });

        return {
            success: true,
            email: verificationToken.email,
        };
    }),
});

// https://trpc.io/docs/server/error-handling
