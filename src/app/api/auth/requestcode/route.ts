import { NextRequest } from "next/server";
import { requestCode } from "./server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { phoneNo, areaCode } = body;
  const response = await requestCode(phoneNo, areaCode);
  return Response.json(response);
}
export async function GET() {
  // const body = await request.json();
  // console.log(body);
  // const response = await requestCode(body);
  return Response.json({ msg: "testhhhhh" });
}
