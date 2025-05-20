import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import { THIRTY_DAYS } from "@/constants/constants";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb", // or "mysql", "postgresql", ...etc
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
});
