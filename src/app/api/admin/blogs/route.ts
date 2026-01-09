import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const { blogID } = await request.json();
    const value = await Blogs.findByIdAndDelete(blogID);
    if (!value) {
      return NextResponse.json({ message: "Enter the valid BlogID" });
    }
    return NextResponse.json(
      { message: "Blog Deleted Successfully", value },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Blog not deleted" });
  }
}
