import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {
  const secret = process.env.JWT_SECRET_KEY;
  const email = request.cookies.get("email")?.value;
  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret });
  if (!email && path.startsWith("/resetpassword")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    token &&
    (path.startsWith("/signup") ||
      path.startsWith("/forgot") ||
      path.startsWith("/signin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token?.isAdmin === "false" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && path.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: [
    "/signin",
    "/otpverify",
    "/signup",
    "/forgot",
    "/resetpassword",
    "/admin/:path*",
    "/profile",
  ],
};
