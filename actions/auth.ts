"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { LogInSchema } from "schemas";
import { signIn, signOut } from "~/server/auth";
import { DEFAULT_AUTHED_REDIRECT_URL } from "~/routes";
import { CurrentOAuthProviders } from "~/server/auth.config";


export const logIn = async (values: z.infer<typeof LogInSchema>): Promise<{ error?: string; success?: boolean }> => {
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
                    console.log("ACTION: CredentialsSignin Error");
                    return { error: "Invalid email or password." };
                case "AuthorizedCallbackError":
                    console.log("ACTION: AuthorizedCallbackError Error");
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
    console.log("ACTION: LogOut started");
    await signOut();
    console.log("ACTION: Completed sign out");
};

/* -------------------------- Third Party Providers ------------------------- */
export const logInOAuth = async (provider: CurrentOAuthProviders) => {
    console.log("ACTION: LogInOAuth started");
    await signIn(provider, {
        callbackUrl: "/",
    });
    console.log("ACTION: Completed sign in");
};
