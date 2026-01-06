import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const blogData = await Blogs.find();
    console.log(blogData)
    return NextResponse.json(blogData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
