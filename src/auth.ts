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
      return session;
    },
    async jwt({ token, user, account }) {
      // if (user) {
      //   token.accessToken = user.accessToken; // Add accessToken to token
      //   return token;
      // }

      console.log("token开始", token, "token结束");

      if (account?.id_token) {
        console.log("进来了啊=======");
        const response = await fetch(
          // /changyou-wap-service/google/verify/v2
          // /changyou-wap-service/apple/login/verify/v2
          `${process.env.BASE_API_URL}/changyou-wap-service/google/verify/v2`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              jwtToken: account.id_token,
            }),
          }
        );
        const data = await response.json();
        console.log({
          data: data,
        });
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
