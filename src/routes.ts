export const publicRoutes: string[] = [
  "/",
  "/api/public/*"
]

/** 
 * Rutas de auth 
 * @type {string[]}
*/
export const authRoutes: string[] = [
  "/api/auth/session",
  "/admin/login",
  "/login",
  "/register"
]

export const adminRoutes: string[] = [
  "/admin/dashboard",
  "/admin/ventas",
  "/admin/usuarios",
  "/admin/productos",
]

export const apiPrefix = "/api/auth"

export const ADMIN_LOGIN_REDIRECT = "/admin/dashboard"