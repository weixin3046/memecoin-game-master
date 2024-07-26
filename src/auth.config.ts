import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLogin = nextUrl.pathname.startsWith("/login");
      if (isLoggedIn) {
        return true;
      } else {
        if (!isLogin) {
          return Response.redirect(new URL("/login", nextUrl));
        }
        return false;
      }
    },
    async jwt({ token, trigger, session, account, user }) {
      if (user) {
        token.accessToken = user.accessToken; // Add accessToken to token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
