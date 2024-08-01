import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export default {
  providers: [
    Apple,
    Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      profile: undefined,
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
