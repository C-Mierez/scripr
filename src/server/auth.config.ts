import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LogInSchema } from "schemas";

import { db } from "./db";
import { getUserByEmail, getUserById } from "./db/queries";

import type { NextAuthConfig } from "next-auth";
import { env } from "~/env.mjs";

export default {
    trustHost: true,
    callbacks: {
        async signIn({ user }) {
            const existingUser = await getUserById(db, user.id);

            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }

            return true;
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
