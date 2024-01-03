"use server";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { LogInSchema } from "schemas";
import * as z from "zod";
import { DEFAULT_AUTHED_REDIRECT_URL } from "~/routes";
import { signIn, signOut } from "~/server/auth";
import { CurrentOAuthProviders } from "~/server/auth.config";
import { db } from "~/server/db";
import { createVerificationTokenForEmail, getUserByEmail } from "~/server/db/queries";

export const logIn = async (values: z.infer<typeof LogInSchema>): Promise<{ error?: string; success?: boolean }> => {
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
    const { email, password } = validatedFields.data;

    /* --------------------------- Email Verification --------------------------- */
    const existingUser = await getUserByEmail(db, email);

    // If the user does not exist, invalidate the request
    if (!existingUser || !existingUser.email || !existingUser.passwordHash) {
        return { error: "Invalid email or password." };
    }

    // If the user exists but is not verified, send a new verification email
    if (!existingUser.emailVerified) {
        const newVerificationToken = await createVerificationTokenForEmail(db, { email: existingUser.email });

        return {
            error: `Email is not verified. A new verification email has been sent to ${newVerificationToken.email}`,
        };
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
