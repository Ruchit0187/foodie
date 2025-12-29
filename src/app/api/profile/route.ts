import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookie = await cookies();
  const cookieData = cookie.get("signin")?.value || "";
  const userEmail = jwt.verify(cookieData, process.env.JWT_SECRET_KEY!);
  console.log(userEmail);
  //   console.log(userEmail)
  return NextResponse.json({ message: "cookie is get" });
}
