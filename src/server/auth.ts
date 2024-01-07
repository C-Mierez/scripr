import authConfig from "~/server/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { pgTable } from "~/server/db/schema";
import { db } from "./db";
import NextAuth from "next-auth";

// declare module "@auth/core" {
//     /**
//      * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         user: {
//             /** The user's postal address. */
//             roleId: number;
//             // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
//         } & DS["user"]; // To keep the default types
//     }
// }
// THIS DOESNT WORK :)

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    // TODO: Check this on future auth.js updates
    // @ts-ignore
    adapter: DrizzleAdapter(db, pgTable),
    ...authConfig,
});
