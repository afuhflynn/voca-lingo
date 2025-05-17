import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./lib/auth.config";

export async function middleware(req: NextRequest) {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = session?.user !== undefined;

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (
    !isAuthenticated &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/practice"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If the user is authenticated and trying to access the login page, redirect to dashboard
  if (isAuthenticated && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect authenticated users to the dashboard if they try to access the sign-up page
  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// general matcher regex array

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
