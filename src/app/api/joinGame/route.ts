// callCrossActivity
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const body = await req.json();
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/game/joinGame`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        code: "500",
        msg: "error",
        content: error.message,
      });
    }
  }
}
