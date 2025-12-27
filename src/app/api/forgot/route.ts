import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/src/helper/mailer";
import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    const cookie = await cookies();
    const randomNumber = Math.floor(Math.random() * 9000 + 10000);
    const jwtToken = Jwt.sign(
      { otp: randomNumber },
      process.env.JWT_SECRET_KEY!
    );
    cookie.set("otp", jwtToken, { maxAge: 300, httpOnly: true });
    sendMail(email, randomNumber);
    return NextResponse.json({ message: "cookies is set" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Otp does not send" });
  }
}
