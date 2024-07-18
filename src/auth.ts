import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import validator from "validator";
// import { sql } from '@vercel/postgres';
// import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';

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

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            phoneNumber: z
              .string()
              .refine((val) => validator.isMobilePhone(val, "zh-CN"), {
                message: "无效的中国区手机号码",
              }),
            code: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { phoneNumber, code } = parsedCredentials.data;
          const user = await handleLogin(phoneNumber, code);
          if (!user) return null;
          const res = await user.json();
          if (res.code === "0") {
            return res;
          } else {
            return null;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
