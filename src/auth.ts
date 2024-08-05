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
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
    async jwt({ token, user, account, session }) {
      if (user) {
        if (user.accessToken) {
          token.accessToken = user.accessToken; // Add accessToken to token
          return token;
        }
      }
      if (account?.id_token) {
        console.log(
          account?.id_token,
          account?.provider,
          "auth.ts 文件中的第41行"
        );
        const url =
          account?.provider === "google"
            ? "/changyou-wap-service/google/verify/v2"
            : "/changyou-wap-service/apple/login/verify/v2";
        const response = await fetch(`${process.env.BASE_API_URL}${url}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            jwtToken: account.id_token,
          }),
        });
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
