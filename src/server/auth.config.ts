import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LogInSchema } from "schemas";

import { db } from "./db";
import {
    getAccountByUserId,
    getUserByEmail,
    getUserById,
    isUserTwoFactorDisabledOrConfirmed,
    isUserVerified,
    verifyUser,
} from "./db/queries";

import type { NextAuthConfig } from "next-auth";
import { env } from "~/env.mjs";

declare module "next-auth" {
    interface User {
        roleId: number;
        isTwoFactorEnabled: boolean;
        isOAuth?: boolean;
    }
}

// THIS DOESNT WORK EITHER :)
// declare module "next-auth/jwt" {
//     interface JWT {
//         roleId: number;
//         isTwoFactorEnabled: boolean;
//     }
// }

export default {
    trustHost: true,
    // This is where the default routes in Auth.js can be overridden or defined
    pages: {
        signIn: "/logIn",
        error: "/authError",
    },
    events: {
        async linkAccount({ user }) {
            // This event is only fired on OAuth signUps, which means we can safely call this verify method
            // OAuthed users don't have to verify their email with us
            verifyUser(db, { id: user.id });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // Skip if the signIn process is done by an OAuth provider
            // We assume that OAuth providers have already verified the user's email
            if (account && account.provider !== "credentials") return true;

            // Otherwise...
            // Check that the user is verified
            if (!(await isUserVerified(db, user.id))) return false;

            // Check if the user has two factor authentication disabled or confirmed
            if (!(await isUserTwoFactorDisabledOrConfirmed(db, user.id))) return false;

            // User is good to go!
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.name && token.email && session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }

            if (token.roleId && session.user) {
                // TODO: Current type augmentation doesn't work. Come back to this later to fix type errors
                session.user.roleId = token.roleId as number;
            }

            if (token.isTwoFactorEnabled !== undefined && session.user) {
                // TODO: Current type augmentation doesn't work. Come back to this later to fix type errors
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (token.isOAuth !== undefined && session.user) {
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            // If not logged in, skip
            if (!token.sub) {
                return token;
            }

            // Fetch user from database
            const user = await getUserById(db, token.sub);

            // Skip if user is not found
            if (!user) {
                return token;
            }

            // Get the account
            const existingAccount = await getAccountByUserId(db, user.id);

            // Set the user name and email inside the jwt token
            token.name = user.name;
            token.email = user.email;

            // Set the user's role ID inside the jwt token
            token.roleId = user.roleId;

            // Set the user's twoFactorStatus inside the jwt token
            token.isTwoFactorEnabled = user.isTwoFactorEnabled;

            // Set the user's OAuth status inside the jwt token
            token.isOAuth = !!existingAccount;

            return token;
        },
    },
    providers: [
        // Remember to modify CurrentOAuthProviders type below, when adding/removing providers
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                console.log("AUTHORIZE: Authorizing credentials...", credentials);
                const validatedFields = LogInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    console.log("AUTHORIZE: Validated fields: ", validatedFields.data);
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(db, email);
                    console.log("AUTHORIZE: Fetched user: ", user);

                    if (!user || !user.passwordHash) return null;

                    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
                    console.log("AUTHORIZE: Password match: ", passwordMatch);

                    return passwordMatch ? user : null;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;

export type CurrentOAuthProviders = "google" | "github";
