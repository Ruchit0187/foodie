import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Provider } from "@/src/model/provider";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    const googleUser=await Provider.findOne({email});
     if (googleUser) {
      return NextResponse.json({ error: "Please Signin With Google" }, { status: 404 });
    }
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
    return NextResponse.json(
      { message: "User SignIn Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
