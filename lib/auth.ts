import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { CustomPrismaAdapter } from "./custom-prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
        httpOptions: {
          timeout: 60000, // 60 seconds
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.sub = user.id;
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        throw error;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        if (url.startsWith("/")) {
          return `${baseUrl}${url}`;
        } else if (new URL(url).origin === baseUrl) {
          return url;
        }
        return baseUrl;
      } catch (error) {
        console.error("Error in redirect callback:", error);
        throw error;
      }
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          if (
            profile?.email_verified &&
            profile?.email?.endsWith("@gmail.com")
          ) {
            return true;
          }
          return false;
        }
        return true; // Do different verification for other providers that don't have `email_verified`
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Explicitly return false on error
      }
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
});
