import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { userID, blogID } = await request.json();
    const userLike = await Blogs.findOne({ _id: blogID, blog_likes: userID });
    if (!userLike){
     const blogLikeValue=await Blogs.findByIdAndUpdate(blogID, {
        $addToSet: { blog_likes: userID },
      },{new:true});
      return NextResponse.json(blogLikeValue, { status: 200 });
    } else {
     const blogLikeValue= await Blogs.findByIdAndUpdate(blogID, {
        $pull: { blog_likes: userID },
      },{new:true});
      return NextResponse.json(blogLikeValue, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "User not LogIn" }, { status: 500 });
  }
}
