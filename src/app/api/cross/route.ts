// callCrossActivity
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChainActivity/callCrossActivity`,
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
      return Response.json(data);
    }
    throw new Error({ ...data });
  } catch (error) {
    console.log(error);
    return error;
  }
}
