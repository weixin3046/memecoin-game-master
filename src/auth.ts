import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {},
  callbacks: {
    async signIn({ user, account }) {
      console.log(account);
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      return true;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      console.log({
        token: token,
        user: user,
        account: account,
      });
      if (user) {
        token.accessToken = user.accessToken; // Add accessToken to token
        return token;
      }

      if (account?.id_token) {
        const response = await fetch(
          // /changyou-wap-service/google/verify/v2
          // /changyou-wap-service/apple/login/verify/v2
          `${process.env.BASE_API_URL}/changyou-wap-service/apple/login/verify/v2`,
          {
            method: "POST",
            body: JSON.stringify({
              jwtToken: account.id_token,
            }),
          }
        );
        const data = await response.json();
        token.accessToken = data.content.loginInfo.token;
        return token;
      }
      return token;

      // if (!token.sub) return token;
      // if (!token.id_token) return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
