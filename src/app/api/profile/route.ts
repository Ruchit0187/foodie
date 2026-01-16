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
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { name, password, _id } = await request.json();
    if (name && !password) {
      const value = await User.findByIdAndUpdate(_id, { name });
      return NextResponse.json(
        { message: "User Name Updated successfully" },
        { status: 200 }
      );
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    if (!name && password) {
      const value = await User.findByIdAndUpdate(_id, {
        password: hashPassword,
      });
      return NextResponse.json(
        { message: "User Password Updated successfully" },
        { status: 200 }
      );
    }
    const updateUser = await User.findByIdAndUpdate(_id,{
      name,
      password: hashPassword,
    });
    return NextResponse.json(
      { message: "User Data Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User Update Not Fetched" },
      { status: 500 }
    );
  }
}
