import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { userID, recipeID } = await request.json();
    const userLike = await Recipes.findOne({ _id: recipeID, likes: userID });
    if (userLike === null) {
     const likeValue=await Recipes.findByIdAndUpdate(recipeID, {
        $addToSet: { likes: userID },
        $inc: { count: 1 },
      });
      return NextResponse.json(likeValue, { status: 200 });
    } else {
     const likeValue= await Recipes.findByIdAndUpdate(recipeID, {
        $pull: { likes: userID },
        $inc: { count: -1 },
      });
      return NextResponse.json(likeValue, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "User not Log in" }, { status: 500 });
  }
}
