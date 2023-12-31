import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z
            .string()
            .url()
            .refine((str) => !str.includes("YOUR_MYSQL_URL_HERE"), "You forgot to change the default URL"),
        AUTH_SECRET: z.string(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
        GITHUB_CLIENT_ID: z
            .string()
            .refine((str) => !str.includes("FILL"), "You forgot to change the GITHUB_CLIENT_ID"),
        GITHUB_CLIENT_SECRET: z
            .string()
            .refine((str) => !str.includes("FILL"), "You forgot to change the   GITHUB_CLIENT_SECRET"),
        GOOGLE_CLIENT_ID: z
            .string()
            .refine((str) => !str.includes("FILL"), "You forgot to change the   GOOGLE_CLIENT_ID"),
        GOOGLE_CLIENT_SECRET: z
            .string()
            .refine((str) => !str.includes("FILL"), "You forgot to change   the GOOGLE_CLIENT_SECRET"),
        RESEND_API_KEY: z
            .string()
            .refine((str) => !str.includes("FILL"), "You forgot to change     the RESEND_API_KEY"),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_APP_URL: z.string().url(),
        NEXT_PUBLIC_DOMAIN: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        AUTH_SECRET: process.env.AUTH_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined.
     * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});
