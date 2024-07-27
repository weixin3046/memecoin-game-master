"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchemas } from "@/schemas";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchemas>,
  callbackUrl?: string | null
) => {
  console.log("jinlaile ");
  const validatedFields = LoginSchemas.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }
  const { phone, areaCode, verifcode } = validatedFields.data;
  console.log(phone, areaCode, verifcode);
  const response = await fetch(
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
        verificationCode: verifcode,
      }),
    }
  );
  if (!response.ok) {
    return {
      error: "Login failed!",
    };
  }
  const data = await response.json();
  console.log(data, "data=======");
  if (data.code === "0") {
    await signIn("credentials", {
      accessToken: data.content.access_token,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } else {
    return {
      error: data.msg,
    };
  }

  return {
    success: "success",
  };
};
