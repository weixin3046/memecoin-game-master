import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const metaHash = url.searchParams.get("metaHash");
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${
        process.env.BASE_API_URL
      }/changyou-wap-service/wallet/queryPublicTxStatus?chainId=${97}&metaHash=${metaHash}`,
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
      msg: "error",
    });
  }
}
