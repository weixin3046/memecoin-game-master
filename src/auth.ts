import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {},
  callbacks: {
    async signIn({ user, account }) {
      console.log(user, account, " user, account ****");
      return true;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, trigger, session, account, user }) {
      if (user) {
        token.accessToken = user.accessToken; // Add accessToken to token
      }
      return token;
    },
  },
  ...authConfig,
});
