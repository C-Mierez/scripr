"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { LogInSchema } from "schemas";
import * as z from "zod";
import { DEFAULT_AUTHED_REDIRECT_URL } from "~/routes";
import { signIn, signOut } from "~/server/auth";
import { CurrentOAuthProviders } from "~/server/auth.config";
import { db } from "~/server/db";
import {
    createTwoFactorTokenForUserId,
    createVerificationTokenForEmail,
    getTwoFactorTokenByUserId,
    getUserByEmail,
    updateTwoFactorTokenConfirmationById,
} from "~/server/db/queries";
import { sendTwoFactorConfirmationEmail, sendVerificationEmail } from "~/server/mail";

export const logIn = async (
    values: z.infer<typeof LogInSchema>
): Promise<{ error?: string; success?: boolean; twoFactorExpected?: boolean }> => {
    //! Important: DISABLE NEXT.JS AUTOMATIC CACHING FROM FETCH
    //! THIS AFFECTS THIRD PARTY LIBRARIES LIKE DRIZZLE
    const _headers = headers();
    /* ---------------------------- Input Validation ---------------------------- */
    console.log("ACTION: LogIn started");
    // Validate the inputted fields
    const validatedFields = LogInSchema.safeParse(values);

    // If the fields are invalid, return an error
    if (!validatedFields.success) {
        let error = "Invalid fields:\n";
        validatedFields.error.issues.forEach((issue) => {
            error += `${issue.message}\n`;
        });
        return { error };
    }

    console.log("ACTION: Validated fields");
    const { email, password, twoFactorToken } = validatedFields.data;

    const existingUser = await getUserByEmail(db, email);

    /* --------------------------- Email Verification --------------------------- */
    // If the user does not exist, invalidate the request
    if (!existingUser || !existingUser.email || !existingUser.passwordHash) {
        return { error: "Invalid email or password." };
    }

    // If the user exists but is not verified, send a new verification email
    if (!existingUser.emailVerified) {
        const newVerificationToken = await createVerificationTokenForEmail(db, { email: existingUser.email });

        // Send the verification email
        await sendVerificationEmail(newVerificationToken.email, newVerificationToken.token);

        return {
            error: `Email is not verified. A new verification email has been sent to ${newVerificationToken.email}`,
        };
    }

    /* -------------------------------- Password -------------------------------- */
    // Check if the user's password is correct
    const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);

    // If the password is incorrect, invalidate the request
    if (!passwordMatch) {
        return { error: "Invalid email or password." };
    }

    /* ------------------------------- Two-Factor ------------------------------- */
    // Check if the user has two-factor enabled
    // If the user had two-factor disabled, they can proceed with the normal login process
    // But, if they have two-factor enabled
    if (existingUser.isTwoFactorEnabled) {
        // Fetch the two-factor token for the user
        const fetchedTwoFactorToken = await getTwoFactorTokenByUserId(db, existingUser.id);

        // If a two-factor token exists
        if (fetchedTwoFactorToken) {
            // If confirmed, user can log in
            // But, if not confirmed, user must confirm it
            if (!fetchedTwoFactorToken.isConfirmed) {
                // If the user inputted a two-factor token, try to verify it
                if (twoFactorToken) {
                    // Check if the two-factor token is correct
                    if (twoFactorToken !== fetchedTwoFactorToken.token) {
                        return { error: "Invalid confirmation token." };
                    }

                    // Verify that the token is not expired
                    if (new Date(fetchedTwoFactorToken.expiresAt) < new Date()) {
                        // Send new token
                        await createAndSendNewTwoFactorToken(existingUser.id, existingUser.email);

                        return {
                            error: "Confirmation token expired. A new confirmation token has been sent to your email.",
                            twoFactorExpected: true,
                        };
                    }

                    // Confirm the two-factor token
                    await updateTwoFactorTokenConfirmationById(db, { id: fetchedTwoFactorToken.id, isConfirmed: true });
                }
                // But, if the user did not input a two-factor token, send a new one
                else {
                    // Send new token
                    await createAndSendNewTwoFactorToken(existingUser.id, existingUser.email);

                    return {
                        twoFactorExpected: true,
                    };
                }
            }
            // But, if the token is confirmed
            else {
                // Verify that the token is not expired
                // If it is expired, since it's confirmed, we just send a new one like if they didn't have one
                if (new Date(fetchedTwoFactorToken.expiresAt) < new Date()) {
                    // Send new token
                    await createAndSendNewTwoFactorToken(existingUser.id, existingUser.email);

                    return {
                        error: "Confirmation token expired. A new confirmation token has been sent to your email.",
                        twoFactorExpected: true,
                    };
                }
            }
        }
        // If no two-factor token was found
        else {
            // Send new token
            await createAndSendNewTwoFactorToken(existingUser.id, existingUser.email);
            return {
                twoFactorExpected: true,
            };
        }
    }

    /* ----------------------------- Auth.js Sign In ---------------------------- */
    try {
        console.log("ACTION: Attempting to sign in");
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_AUTHED_REDIRECT_URL,
            redirect: true,
        });
        console.log("ACTION: Completed sign in");
    } catch (error) {
        console.log("ACTION: Sign in error thrown");
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                case "AuthorizedCallbackError":
                    return { error: "User is not verified." };
                default:
                    return { error: "Unknown error." };
            }
        }
        throw error;
    }

    return { success: true };
};

export const logOut = async () => {
    //! Important: DISABLE NEXT.JS AUTOMATIC CACHING FROM FETCH
    //! THIS AFFECTS THIRD PARTY LIBRARIES LIKE DRIZZLE
    const _headers = headers();
    console.log("ACTION: LogOut started");
    await signOut();
    console.log("ACTION: Completed sign out");
};

/* -------------------------- Third Party Providers ------------------------- */
export const logInOAuth = async (provider: CurrentOAuthProviders) => {
    //! Important: DISABLE NEXT.JS AUTOMATIC CACHING FROM FETCH
    //! THIS AFFECTS THIRD PARTY LIBRARIES LIKE DRIZZLE
    const _headers = headers();
    console.log("ACTION: LogInOAuth started");
    await signIn(provider, {
        callbackUrl: "/",
    });
    console.log("ACTION: Completed sign in");
};

/* ---------------------------------- Utils --------------------------------- */
async function createAndSendNewTwoFactorToken(userId: string, userEmail: string) {
    // Create a new two-factor token
    const newTwoFactorToken = await createTwoFactorTokenForUserId(db, { userId: userId });

    // Send the two-factor confirmation email
    await sendTwoFactorConfirmationEmail(userEmail, newTwoFactorToken.token);
}
