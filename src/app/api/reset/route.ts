import { dbConnect } from "@/src/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/model/userSchema";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password, old_password } = await request.json();
    if (old_password) {
      const olduserPassword = await User.findOne({ email });
      const passwordMatch = await bcrypt.compare(
        old_password,
        olduserPassword?.password!,
      );
      if (!passwordMatch) {
        return NextResponse.json(
          { error: "old password is Wrong" },
          { status: 401 },
        );
      }
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const cookie = await cookies();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not Found" }, { status: 401 });
    }
    await User.findByIdAndUpdate(user?._id, { password: hashPassword });
    cookie.delete("email");
    return NextResponse.json(
      { message: "Password change Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
