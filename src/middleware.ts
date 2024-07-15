import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const response = NextResponse.next();
  const token = searchParams.get("token");
  const oneDay = 24 * 60 * 60 * 1000;
  response.cookies.set("token", token || "", { expires: Date.now() - oneDay });
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
