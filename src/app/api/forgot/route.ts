import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  const randomNumber = Math.floor(Math.random() * 9000 + 10000);
  const jwtToken = Jwt.sign(
    { otp: randomNumber },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1d",
    }
  );
  cookie.set("otp", jwtToken);
  return NextResponse.json({ message: "cookies is set" }, { status: 200 });
}
