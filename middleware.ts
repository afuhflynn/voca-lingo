import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const authCookie = cookies.get("better-auth.session_token");
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = authCookie !== undefined;

  // Redirect authenticated users to the dashboard if they try to access the sign-up page
  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (
    !isAuthenticated &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/chat"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if ((isAuthenticated || !isAuthenticated) && pathname === "/practice") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  // If the user is authenticated and trying to access the login page, redirect to dashboard
  if (isAuthenticated && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not authenticated and trying to access the signout page, redirect to home page
  if (!isAuthenticated && pathname === "/sign-out") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is authenticated and trying to access the login page, redirect to dashboard
  if (isAuthenticated && pathname.endsWith("/lessons")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// general matcher regex array

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
