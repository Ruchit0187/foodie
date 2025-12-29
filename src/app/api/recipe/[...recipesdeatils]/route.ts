import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const recipeId = request.url.split("/").at(-1);
    const recipeDetails = await Recipes.findById(recipeId);
    return NextResponse.json({ recipeDetails }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Item not Found" }, { status: 500 });
  }
}
