import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          username: profile.login,
          bio: profile.bio,
          emailVerified: true,
          provider: "github",
          providerAccountId: profile.id,
          image: profile.avatar_url,
        };
      },
    },
    google: {
      prompt: "select_account",
      accessType: "offline",
      responseType: "code",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          username: profile.given_name + profile.family_name,
          emailVerified: true,
          bio: "",
          provider: "github",
          providerAccountId: profile.aud,
          image: profile.picture,
        };
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [nextCookies()],
});
