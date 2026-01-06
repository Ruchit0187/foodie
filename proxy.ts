import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request,secret:process.env.JWT_SECRET_KEY });
  const url = request.nextUrl.clone();
  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/emailverify"))
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/otpverify", "/recipes/:path*", "/forgot"],
};
