import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { Recipes } from "@/src/model/recipeSchema";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { userID, recipeID } = await request.json();
    const bookmarks = await Recipes.findOne({
      _id: recipeID,
      bookmark: userID,
    });
    if (bookmarks === null) {
      const bookmarkValue = await Recipes.findByIdAndUpdate(
        recipeID,
        {
          $addToSet: { bookmark: userID as ObjectId },
        },
        { new: true }
      );
      return NextResponse.json(
        { bookmarkValue, message: "Add bookmark" },
        { status: 200 }
      );
    } else {
      const bookmarkValue = await Recipes.findByIdAndUpdate(
        recipeID,
        {
          $pull: { bookmark: userID },
        },
        { new: true }
      );
      return NextResponse.json(
        { bookmarkValue, message: "Remove Bookmark" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "User not LogIn" }, { status: 500 });
  }
}
