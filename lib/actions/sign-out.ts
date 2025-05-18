"use server";

// create a github signin action
import { signOut } from "@/lib/auth";

export const signOutAction = async () => {
  await signOut();
};
