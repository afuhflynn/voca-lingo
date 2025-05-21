"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) return null;

  return session;
}
