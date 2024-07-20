import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // https://api.qwerty2.com/changyou-wap-service/userAlipayCoupon/receiveAlipayCoupon
  try {
    const session = await auth();
    const token = session?.accessToken;
    const body = await req.json();
    console.log(body);
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/userAlipayCoupon/receiveAlipayCoupon`,
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
    return NextResponse.json({ ...data });
  } catch (error) {
    return NextResponse.json({
      code: "500",
      msg: "error",
      content: null,
    });
  }
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sourceActivity = url.searchParams.get("sourceActivity");
  console.log(sourceActivity);
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/userAlipayCoupon/receiveAlipayCoupon?sourceActivity=${sourceActivity}`,
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
    return NextResponse.json({ ...data });
  } catch (error) {
    return NextResponse.json({
      code: "500",
      msg: "error",
      content: null,
    });
  }
}
