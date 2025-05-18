import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { signOut } from "@/lib/auth";

/**
 * @description A function that handles user sign up and account creation
 * @param req
 * @returns
 */

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required!",
      },
      { status: 400 }
    );
  }

  if (email.trim() !== session?.user.email?.trim()) {
    return NextResponse.json(
      {
        success: false,
        message: "The email you provided is invalid or incorrect",
      },
      { status: 400 }
    );
  }
  try {
    //Check if user code is still valid
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
        id: session?.user.id as string,
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          success: false,
          message: "User session has expired or is invalid!",
        },
        { status: 403 }
      );

    // Delete current user, clear cookies and send emails
    const deletedUser = await prisma.user.delete({
      where: {
        email: foundUser.email as string,
        id: foundUser.id as string,
      },
    });

    if (!deletedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Sorry, an unexpected error occurred updating your password",
        },
        { status: 500 }
      );
    }

    // clear cookie and session
    await signOut({ redirect: false, redirectTo: "/" });

    return NextResponse.json(
      {
        success: true,
        message: "User account deleted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Error deleting your account at moment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
