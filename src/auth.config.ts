import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export default {
  providers: [
    Apple({
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
      clientId: process.env.APPLE_CLIENT_ID,
      wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
      checks: ["pkce"],
      token: {
        url: `https://appleid.apple.com/auth/token`,
      },
      authorization: {
        url: "https://appleid.apple.com/auth/authorize",
        params: {
          scope: "",
          response_type: "code",
          response_mode: "query",
          state: crypto.randomUUID(),
        },
      },
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // const validatedFields = LoginSchema.safeParse(credentials);

        // if (validatedFields.success) {
        let user = {
          accessToken: credentials.accessToken as string,
        };
        return user;
        // }

        // return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
