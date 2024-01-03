/**
 * Routes that are accessible to the public (unauthenticated users).
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Routes that are used for authentication purposes.
 * Will redirect to DEFAULT_AUTHED_REDIRECT_URL if already authenticated.
 * @type {string[]}
 */
export const authRoutes = ["/logIn", "/signUp", "/authError"];

/**
 * The prefix for API authentication routes.
 * These routes are used for API Authentication and thus should always be public.
 */
export const ApiAuthPrefix = "/api/auth";

/**
 * The prefix for tRPC  routes.
 * These routes are used for tRPC and have their own middleware implementation.
 */
export const ApiTRPCPrefix = "/api/trpc";

export const DEFAULT_LOGIN_REDIRECT_URL = "/logIn";

export const DEFAULT_AUTHED_REDIRECT_URL = "/dashboard";
