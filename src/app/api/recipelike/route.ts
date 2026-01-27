import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs, Iblog } from "@/src/model/blogSchema";
import { Irecipes, Recipes } from "@/src/model/recipeSchema";
import { message } from "antd";
import { Model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { userID, recipeID, blogID } = await request.json();
    const database: Model<Irecipes | Iblog> = recipeID ? Recipes : Blogs;
    const databaseID = recipeID ? recipeID : blogID;
    const userLike = await database.findOne({ _id: databaseID, likes: userID });
    if (!userLike) {
      const likeValue = await database.findByIdAndUpdate(
        databaseID,
        {
          $addToSet: { likes: userID },
        },
        { new: true },
      );
      return NextResponse.json({likeValue,message:false}, { status: 200 });
    } else {
      const likeValue = await database.findByIdAndUpdate(
        databaseID,
        {
          $pull: { likes: userID },
        },
        { new: true },
      );
      return NextResponse.json({likeValue,message:true}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "User not LogIn" }, { status: 500 });
  }
}
