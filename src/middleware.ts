import NextAuth from "next-auth";
import authConfig from "~/server/auth.config";

import {
    ApiAuthPrefix,
    ApiTRPCPrefix,
    DEFAULT_AUTHED_REDIRECT_URL,
    DEFAULT_LOGIN_REDIRECT_URL,
    authRoutes,
    publicRoutes,
} from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // console.log("MIDDLEWARE: req", req);
    console.log("MIDDLEWARE: req", req.auth);

    const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
    const isApiTRPCRoute = nextUrl.pathname.startsWith(ApiTRPCPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If the route is a public API route, don't do anything
    if (isApiAuthRoute || isApiTRPCRoute) {
        return null;
    }

    // If the user is logged in and the route is an auth route, redirect to the dashboard
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_AUTHED_REDIRECT_URL, nextUrl));
        }
        return null;
    }

    // If the user is not logged in and the route is not public, redirect to the login page
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    // Regex fetched from Clerk's own documentation
    // https://clerk.com/docs/references/nextjs/auth-middleware#usage
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
