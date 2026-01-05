import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface Itoken {
  name: string;
  value: string;
  path: string;
}
interface Ijwt {
  otp: number;
  iat: number;
  exp: number;
}
export async function POST(request: NextRequest) {
  const { mailOtp } = await request.json();
  const cookie = await cookies();
  const token = cookie.get("otp") as Itoken;
  if (!token) {
    return NextResponse.json({ error: "Time is Expiry" }, { status: 400 });
  }
  const decode = jwt.verify(String(token.value), process.env.JWT_SECRET_KEY!) as Ijwt;
  if (decode.otp === mailOtp) {
    cookie.set("otp", "");
    return NextResponse.json(
      { message: "OTP verify Successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Enter the valid OTP" }, { status: 400 });
  }
}
