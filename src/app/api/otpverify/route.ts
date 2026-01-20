import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { User } from "@/src/model/userSchema";
import { userData } from "@/src/types";

interface userOtpData extends userData {
  otp: number;
  otpExpiry: Date;
}
export async function POST(request: NextRequest) {
  const session = await auth();
  const cookie = await cookies();
  const { mailOtp } = await request.json();
  const email = cookie.get("email");
  const userEmail = session ? session.user?.email : email?.value;
  const databaseUser = (await User.findOne({
    email: userEmail,
  })) as userOtpData;
  if (databaseUser?.otpExpiry < new Date() || !databaseUser) {
    return NextResponse.json({ error: "Time is Over" }, { status: 400 });
  }
  if (databaseUser.otp !== mailOtp) {
    return NextResponse.json({ error: "Otp Does not Match" }, { status: 400 });
  }
  cookie.delete("email");
  await User.findByIdAndUpdate(databaseUser._id, {
    $unset: {
      otp: 0,
      otpExpiry: "",
    },
  });
  return NextResponse.json(
    { message: "Otp Verify Successfully" },
    { status: 200 },
  );
}
