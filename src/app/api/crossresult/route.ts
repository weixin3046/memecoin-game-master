import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const crossChainId = url.searchParams.get("crossChainId");

  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChainActivity/queryCallCrossResult?crossChainId=${crossChainId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    // if (data.code == "0") {
    //   return NextResponse.json({ msg: data.msg, content: data.content });
    // }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: "0",
      msg: "error",
      content: null,
    });
  }
}
