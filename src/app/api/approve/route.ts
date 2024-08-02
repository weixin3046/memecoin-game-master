import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChainActivity/queryWhetherCallCrossByActivity`,
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
    console.log(data, "approve data");
    if (data.code == "0") {
      return Response.json({ isApprove: data.content });
    }
    return Response.json({ msg: data.msg, isApprove: "N" });
  } catch (error) {
    return {
      data: "0",
      msg: "error",
      isApprove: "N",
    };
  }
}
