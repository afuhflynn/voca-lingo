import NextAuth from "next-auth";
import { CustomPrismaAdapter } from "./custom-prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [],
});
