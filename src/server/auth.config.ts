import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LogInSchema } from "schemas";

import { db } from "./db";
import { getUserByEmail, getUserById, isUserVerified, verifyUser } from "./db/queries";

import type { NextAuthConfig } from "next-auth";
import { env } from "~/env.mjs";

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

            // Otherwise, make sure the user is verified
            return await isUserVerified(db, user.id);
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.roleId && session.user) {
                // TODO: Current type augmentation doesn't work. Come back to this later to fix type errors
                // @ts-ignore
                session.user.roleId = token.roleId;
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

            // Set the user's role ID inside the jwt token
            token.roleId = user.roleId;

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
