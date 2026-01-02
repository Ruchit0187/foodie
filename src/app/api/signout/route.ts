import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  try {
    cookie.delete("signin")
    return NextResponse.json(
      { message: "User signout successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "User not SignOut" }, { status: 400 });
  }
}
