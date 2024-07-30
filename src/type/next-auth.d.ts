// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string | unknown;
    provider: string | unknown;
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }

  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
