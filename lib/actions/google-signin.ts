"use server";

// create a google signin action
import { signIn } from "@/lib/auth";

export const googleSignIn = async () => {
  await signIn("google", { redirect: false });
};
