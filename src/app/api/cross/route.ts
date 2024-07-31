// callCrossActivity
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const body = await req.json();
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
          ...body,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    console.log(data);
    // if (data.code == "0") {
    return Response.json(data);
    // }
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
