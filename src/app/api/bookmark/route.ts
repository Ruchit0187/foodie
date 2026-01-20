import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs, Iblog } from "@/src/model/blogSchema";
import { Irecipes, Recipes } from "@/src/model/recipeSchema";
import { Model, ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const { userID, recipeID, blogID } = await request.json();
    const databaseModel: Model<Irecipes | Iblog> = recipeID ? Recipes : Blogs;
    const updateID = recipeID ? recipeID : blogID;
    const bookmarks = await databaseModel.findOne({
      _id: updateID,
      bookmark: userID,
    });
    if (bookmarks === null) {
      const bookmarkValue = await databaseModel.findByIdAndUpdate(
        updateID,
        {
          $addToSet: { bookmark: userID as ObjectId },
        },
        { new: true },
      );
      return NextResponse.json(
        { bookmarkValue, message: "Add bookmark" },
        { status: 200 },
      );
    } else {
      const bookmarkValue = await databaseModel.findByIdAndUpdate(
        updateID,
        {
          $pull: { bookmark: userID },
        },
        { new: true },
      );
      return NextResponse.json(
        { bookmarkValue, message: "Remove Bookmark" },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "User not LogIn" }, { status: 500 });
  }
}
