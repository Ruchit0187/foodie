import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const secret = process.env.JWT_SECRET_KEY;
  const cookie = await cookies();
  const otp = cookie.get("otp");
  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret });
  if (!otp && path.startsWith("/otpverify")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && (path.startsWith("/signin") || path.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: [
    "/",
    "/signin",
    "/otpverify",
    "/signup",
    "/forgot",
    "/resetpassword",
    
  ],
};
