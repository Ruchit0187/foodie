import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  await dbConnect();
  try {
    const blogID = request.url.split("/").at(-1);
    const blogData = await Blogs.findById(blogID).select('-blog_likes -_id');
    return NextResponse.json( blogData , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}