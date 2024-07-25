import { NextRequest, NextResponse } from "next/server";
import { requestCode } from "./server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phoneNo, areaCode } = body;
  const res = await requestCode(phoneNo, areaCode);
  return NextResponse.json(res);
}
