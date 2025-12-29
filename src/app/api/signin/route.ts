import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not  Found" }, { status: 404 });
    }
    if (!user.isVerify) {
      return NextResponse.json(
        { error: "User Mail is not verify" },
        { status: 404 }
      );
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }
    const signToken = {
      email: email,
      password: password,
    };
    const token = jwt.sign(signToken, process.env.JWT_SECRET_KEY!);
    const response = NextResponse.json(
      { message: "User SignIn Successfully" },
      { status: 200 }
    );
    response.cookies.set("signin", token, { httpOnly: true });
    console.log(response)
    return response;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
