import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search");
    const difficulty = searchParams.get("difficulty");
    const category = searchParams.get("category");
    const limit = Number(searchParams.get("limit"));
    const query: Record<string, any> = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    const filterRecipes = await Recipes.find(query).limit(limit*6);
    // const filterRecipes = await Recipes.find({
    //   $or: [{ name: search }, { difficulty }],
    // });
    return NextResponse.json(filterRecipes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
