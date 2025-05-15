// lib/auth/custom-prisma-adapter.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

export const CustomPrismaAdapter = (prisma: PrismaClient): Adapter => {
  const baseAdapter = PrismaAdapter(prisma);

  return {
    ...baseAdapter,
    async linkAccount(account) {
      const {
        providerAccountId,
        provider,
        type,
        userId,
        access_token,
        expires_at,
        id_token,
        refresh_token,
        scope,
        session_state,
        token_type,
      } = account;

      await prisma.account.create({
        data: {
          userId,
          provider,
          providerAccountId,
          type,
          access_token: access_token, // rename to match schema
          expires_at: expires_at,
          id_token: id_token,
          refresh_token: refresh_token,
          scope,
          session_state: session_state as string,
          token_type: token_type,
        },
      });
    },
  };
};
