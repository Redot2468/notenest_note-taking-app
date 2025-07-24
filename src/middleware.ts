import { authConfig } from "@/src/authConfig";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/src/route";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  console.log(isLoggedIn, req.auth, "yes");

  const currentPath = req?.nextUrl?.pathname;

  const isPublicRoute = publicRoutes.includes(currentPath);
  const isApiAuthRoute = currentPath?.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(currentPath);

  if (isPublicRoute) return;
  if (isApiAuthRoute) return;

  console.log(
    isAuthRoute,
    "auth",
    currentPath,
    authRoutes.includes(currentPath),
  );
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req?.nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = currentPath;

    if (req?.nextUrl?.search) {
      callbackUrl += req?.nextUrl?.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req?.nextUrl),
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

//OAuth
