import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, z, ZodError } from "zod";
import { authConfig } from "./auth.config";
import { LoginSchemas } from "./schemas";

async function handleLogin(
  phone: string,
  code: string,
  areaCode: string
): Promise<Response | undefined> {
  try {
    const user = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/p2ap/silentRegistration`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          areaCode: areaCode,
          inputInviteCode: "",
          phoneNumber: phone,
          verificationCode: code,
        }),
      }
    );
    // const data = await user.json()
    // if(data.code==="0"){

    // }
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { phone, verifcode, areaCode } = await LoginSchemas.parseAsync(
          credentials
        );
        try {
          let user = null;
          user = await handleLogin(phone, verifcode, areaCode);
          user = await user?.json();
          if (!user) {
            return null;
          }
          if (user.code === "0") {
            return {
              ...user.content,
              accessToken: user.content.access_token,
            };
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
