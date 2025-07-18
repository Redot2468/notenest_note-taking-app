/**
 * These are the public routes, accessible by anyone
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * This is the api auth prefix, should be accessible by everyone
 * @type {string}
 */

export const apiAuthPrefix = "/api";

/**
 * This is the auth routes, should be accessible by everyone except logged in users.
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgotpassword",
  "/auth/resetpassword",
  "/auth/verifyemail",
];

/**
 * This is the default route, after login.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/notes";
