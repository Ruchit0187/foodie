import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/src/helper/mailer";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if(!user){
        return NextResponse.json({error:"User not  Found"},{status:404})
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return NextResponse.json({error:"Incorrect Password"},{status:401})
    }
      sendMail("ruchitvasoya2010@gmail.com");
    return NextResponse.json({message:"User SignIn Successfully"},{status:200})
  } catch (error) {
    return NextResponse.json({ error });
  }
}
