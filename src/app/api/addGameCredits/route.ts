import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const body = await req.json();
    console.log(token);
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/game/addGameCredits`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
        body: body,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return {
      error: "error",
    };
  }
}
