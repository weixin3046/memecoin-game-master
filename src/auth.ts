import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, z, ZodError } from "zod";
import validator from "validator";
import { authConfig } from "./auth.config";

async function handleLogin(
  phone: string,
  code: string
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
          areaCode: "",
          inputInviteCode: "",
          phoneNumber: phone,
          verificationCode: code,
        }),
      }
    );
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

const signInSchema = object({
  phoneNumber: z
    .string()
    .refine((val) => validator.isMobilePhone(val, "zh-CN"), {
      message: "无效的中国区手机号码",
    }),
  code: z.string().min(6),
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { phoneNumber, code } = await signInSchema.parseAsync(
          credentials
        );
        try {
          let user = null;

          user = await handleLogin(phoneNumber, code);
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
