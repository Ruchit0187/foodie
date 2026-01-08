import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/model/userSchema";
import { dbConnect } from "@/src/lib/dbConnect";

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const { email } = await request.json();
    console.log(email)
    const user = await User.findOne({ email }).select("-_id -password");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 });
  }
}
