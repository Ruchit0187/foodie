import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import bcrypt from "bcryptjs";
import { sendMail } from "@/src/helper/mailer";
import { Provider } from "@/src/model/provider";
import { headers } from "next/headers";
import { countryName } from "../visitors/route";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password, name, isOwner, isAdmin } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already Registered" },
        { status: 409 },
      );
    }
    const googleUser = await Provider.findOne({ email });
    if (googleUser) {
      return NextResponse.json(
        { error: "Please Signup With the Google" },
        { status: 409 },
      );
    }
    const headersList = await headers();
    const countryCode = headersList.get("x-vercel-ip-country") || "Unknown";
    const country =
      countryName[countryCode as keyof typeof countryName] || "Unknown";
    const hashPassword = await bcrypt.hash(password, 10);
    const verifyToken = bcrypt.hashSync(name, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
      verifyToken,
      verifyTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
      isAdmin: isAdmin ? true : false,
      isOwner: isOwner ? true : false,
      location: country,
    });
    await sendMail(email, undefined, verifyToken);
    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
