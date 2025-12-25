import { dbConnect } from "@/src/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/model/userSchema";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "USer not Found" }, { status: 401 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user?._id, { password: hashedPassword });
    return NextResponse.json(
      { message: "Password change Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
