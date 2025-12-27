import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { verifyToken } = await request.json();
    const user = await User.findOne({
      verifyToken,
      verifyTokenExpiry: { $gt: new Date() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token id" }, { status: 400 });
    }
    user.isVerify = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "User mail Verify successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
