
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiPrefix,
} from "@/routes"


export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(token)

  if (isApiAuthRoute) {
    return null
  }
  
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl))
  }
  
  return null
}


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
