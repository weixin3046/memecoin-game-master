import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/login");
      if (isLoggedIn) {
        if (isOnDashboard) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }
      return false;
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
