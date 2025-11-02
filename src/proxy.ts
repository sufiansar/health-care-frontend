import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  console.log(token);
  if (pathname.startsWith("/login") || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }
  const authRoutes = ["/login", "/register", "/forgot-password"];

  const isAuthRoute = authRoutes.some((route) => pathname === route);

  console.log("isAuthRoute:", isAuthRoute);
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};
