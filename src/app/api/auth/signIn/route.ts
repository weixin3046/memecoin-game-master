import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleLogin } from "./server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await handleLogin(body);
  const json = response;
  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        msg: json.msg,
        code: json.code,
      },
      { status: response.status || 500 }
    );
  }
  if (json.code === "0") {
    const token = json.content.access_token;
    const response = NextResponse.json({
      msg: json.msg,
      success: true,
      code: json.code,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  }
  return NextResponse.json({
    success: false,
    msg: json.msg,
    code: json.code,
  });
}

export async function DELETE() {
  await cookies().delete("token");
  return NextResponse.json({
    success: true,
    msg: "推出登录",
    code: "0",
  });
}
