import { auth } from "@/auth";
import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = request.nextUrl;
    const isOwner = searchParams.get("session");
    if (isOwner === "true") {
      const users = await User.find({ isOwner: false });
      return NextResponse.json(
        { users, message: "user find successfully" },
        { status: 200 }
      );
    }
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
    const value = await User.findByIdAndDelete(userID);
    return NextResponse.json(
      { message: "User Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "user not Deleted" }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { id, isAdmin } = await request.json();
    await User.findByIdAndUpdate(id, { $set: { isAdmin: !isAdmin } });
    return NextResponse.json({ message: "Update the Role" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "user not Found" }, { status: 500 });
  }
}
