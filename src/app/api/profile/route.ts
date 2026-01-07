import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/model/userSchema";
import { dbConnect } from "@/src/lib/dbConnect";

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email }).select("-_id");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
