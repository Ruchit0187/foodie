import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { sendMail } from "@/src/helper/mailer";

interface Itoken {
  name: string;
  value: string;
  path: string;
}

export async function POST(request: NextRequest) {
  const { email,mailOtp } = await request.json();
  const cookie = await cookies();
  const token = cookie.get("otp") as Itoken;
  console.log(token);
  const decode = jwt.verify(String(token.value), process.env.JWT_SECRET_KEY!);
  sendMail(email, decode.otp);
  if (decode.otp === mailOtp) {
    return NextResponse.json(
      { message: "OTP verify Successfully"},
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Enter the valid OTP" }, { status: 400 });
  }
}
