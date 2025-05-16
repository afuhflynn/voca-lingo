"use server";

// create a github signin action
import { signIn } from "@/lib/auth";

export const githubSignIn = async () => {
  await signIn("github");
};
