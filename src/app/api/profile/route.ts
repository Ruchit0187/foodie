import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/model/userSchema";
import { dbConnect } from "@/src/lib/dbConnect";
import bcrypt from "bcryptjs";
import { Provider } from "@/src/model/provider";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get("email");
    const user = await User.findOne({ email });
    if (!user) {
      const googleUser = await Provider.findOne({ email });
      return NextResponse.json(googleUser, { status: 200 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { name, _id } = await request.json();
    const value = await User.findByIdAndUpdate(_id, { name }, { new: true });
    if (!value) {
      const googleUser = await Provider.findByIdAndUpdate(
        _id,
        { name },
        { new: true },
      );
      console.log({googleUser})
      return NextResponse.json(
        { message: "User Name Updated successfully",googleUser },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "User Name Updated successfully",value },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User Update Not Fetched" },
      { status: 500 },
    );
  }
}
