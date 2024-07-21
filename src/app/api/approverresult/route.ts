import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const approveCrossId = url.searchParams.get("approveCrossId");

  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.BASE_API_URL}/changyou-wap-service/crossChain/getApproveCrossResult?approveCrossId=${approveCrossId}`,
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
    if (data.code == "0") {
      return NextResponse.json(data);
    }
    throw new Error(data.msg);
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
    // return NextResponse.json(
    //   {
    //     error: errorMessage,
    //   },
    //   { status: 500 }
    // );
  }
}
