import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = ["/crypto-bot", "/coin-analysis", "/page-one", "/security-check"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // If it's not a protected path, allow the request
  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Check for the auth cookie (this is a simple check - in a real app you'd verify the token)
  const user = request.cookies.get("user")

  // If there's no user and the path is protected, redirect to login
  if (!user && isProtectedPath) {
    const loginUrl = new URL("/login", request.url)
    // Add a redirect parameter so we can send them back after login
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - login and signup pages
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
}
