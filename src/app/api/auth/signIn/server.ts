"use server";

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
