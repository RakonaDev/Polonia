export const publicRoutes: string[] = [
  "/",
  "/api/public/*"
]

/** 
 * Rutas de auth 
 * @type {string[]}
*/
export const authRoutes: string[] = [
  "/admin/login",
  "/login",
  "/register"
]

export const apiPrefix = "/api/auth"

export const ADMIN_LOGIN_REDIRECT = "/admin/dashboard"