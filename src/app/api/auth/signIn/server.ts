"use server";
import { signIn } from "@/auth";
import { LoginSchemas } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function handleLogin(formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/p2ap/silentRegistration`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          areaCode: "",
          inputInviteCode: "",
          ...formData,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    return error;
  }
}

export async function authenticate(
  // prevState: string | undefined,
  formData: z.infer<typeof LoginSchemas>
) {
  try {
    await signIn("credentials", {
      ...formData,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
