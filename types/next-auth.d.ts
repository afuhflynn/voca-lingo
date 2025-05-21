// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// import { JWT as DefaultJWT } from "better-auth/";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       username: string;
//       bio: string | null;
//       signedInAt: string;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     username: string;
//     bio: string | null;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     id: string;
//     username: string;
//     bio: string | null;
//     signedInAt: string;
//   }
// }
