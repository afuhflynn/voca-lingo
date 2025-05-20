"use client";

// create a github signin action
import { authClient } from "../auth-client";

export const signOutAction = async () => {
  await authClient.signOut();
};
