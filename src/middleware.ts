
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiPrefix,
  adminRoutes,
} from "@/routes"


export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  console.log("NextUrl: ", nextUrl.pathname)
  console.log("Section Admin?: ", isAdminRoute)
  console.log("Is Login Admin: ", isAuthRoute)
  console.log("TOKEN: ", token)
  console.log("Tiempo de Ejecución: ", new Date().toLocaleTimeString())

  if (isApiAuthRoute) {
    return null
  }
  
  if (isAuthRoute) {
    console.log("Estoy en auth")
    if (token) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }
  /*
  if ( isAdminRoute && !token) {
    console.log("No se encontro el token")
    return NextResponse.redirect(new URL("/admin/login", nextUrl))
  }*/

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl))
  }

  
  return null
}


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
