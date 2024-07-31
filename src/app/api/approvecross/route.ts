import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const body = await req.json();
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChainActivity/approveEmpowerByActivity`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ activityType: "mmGame", ...body }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch account balance");
    }
    const data = await response.json();
    console.log(data);
    if (data.code == "0") {
      return NextResponse.json(data);
    }
    throw new Error("Transaction execution failed");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
