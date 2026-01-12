import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({ isAdmin: false });
    return NextResponse.json(
      { users, message: "user find successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Data Not Fetch" }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const { userID } = await request.json();
    const value=await User.findByIdAndDelete(userID);
    return NextResponse.json(
      { message: "User Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "user not Deleted" }, { status: 500 });
  }
}
