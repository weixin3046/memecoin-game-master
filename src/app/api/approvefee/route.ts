import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChainActivity/getApproveFeeInfosByActivity`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          activityType: "mmGame",
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    if (data.code == "0") {
      return Response.json({ amounts: data.content.amounts });
    }
    return Response.json({ msg: data.msg, amounts: "0" });
  } catch (error) {
    return {
      data: "0",
      msg: "error",
      amounts: "0",
    };
  }
}
