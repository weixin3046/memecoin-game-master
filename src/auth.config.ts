import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export default {
  providers: [
    Apple({
      clientId: process.env.APPLE_CLIENT_SECRET,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
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
