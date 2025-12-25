import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import { User } from "@/src/model/userSchema";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password, name } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already Registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return NextResponse.json(
      { message: "User Registered Successfully"},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
