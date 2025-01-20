import { clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isAdminRoute = createRouteMatcher(['/admin/dashboard', '/admin/ventas', '/admin/usuarios', '/admin/productos'])
const isAdminLogin = createRouteMatcher(['/admin/login'])
const isUserLogin = createRouteMatcher(['/sign-in'])
const isApiAdmin = createRouteMatcher(['/api/private(/.*)'])
const isWebHookPublic = createRouteMatcher(['/api/public(/.*)'])

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, request) => {
  const session = await auth()

  if (isWebHookPublic(request)) {
    
    return NextResponse.next()
  }

  if (isApiAdmin(request)) {
    if( session.sessionClaims?.metadata?.role === 'admin' ) {
      return NextResponse.next()
    }
    return NextResponse.json({ error: 'No tienes permisos para acceder a esta ruta' }, { status: 401 })
  }

  if (isAdminLogin(request)) {
    if( session.sessionClaims?.metadata?.role === 'admin' ) {
      const url = new URL('/admin/dashboard', request.nextUrl)
      return NextResponse.redirect(url)
    } 
  }
  
  if (isUserLogin(request)) {
    if( session.userId ) {
      const url = new URL('/', request.nextUrl)
      return NextResponse.redirect(url)
    } 
  }

  if (isAdminRoute(request)) {
    if( (await auth()).sessionClaims?.metadata?.role === 'admin' ) {
      console.log("Esta permitido")
      return NextResponse.next()
    }
    else {
      const url = new URL('/admin/login', request.nextUrl)
      return NextResponse.redirect(url)
    }
  }
  
  console.log(request.nextUrl.pathname)
  return null
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
