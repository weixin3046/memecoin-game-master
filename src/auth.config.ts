import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        let user = {
          accessToken: credentials.accessToken as string,
        };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
