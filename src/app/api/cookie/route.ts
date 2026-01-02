import { cookies } from "next/headers";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface IjwtToken {
  id: ObjectId;
  email: string;
  password: string;
  iat: number;
}

export async function GET() {
  try {
    const cookie = await cookies();
    const signValue = cookie.get("signin")?.value as string;
    const { id } = jwt.verify(
      signValue,
      process.env.JWT_SECRET_KEY!
    ) as IjwtToken;

    return NextResponse.json(id, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "cookie not found" }, { status: 500 });
  }
}
