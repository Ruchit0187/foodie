import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET!;
export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  if (!token || token.isAdmin !== true) {
    return NextResponse.json(
      { error: "Normal User can not Update" },
      { status: 401 },
    );
  }
  await dbConnect();
  try {
    const {
      name,
      category,
      difficulty,
      cookingTimeMinutes,
      ingredients,
      image,
    } = await request.json();
    const insetValue = {
      name,
      category,
      difficulty,
      cookingTimeMinutes,
      ingredients,
      image,
    };
    const value = await Recipes.insertOne(insetValue);
    return NextResponse.json(
      { message: "Recipe add Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Data not Upload" }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log(token);
  if (!token || token.isAdmin !== true) {
    return NextResponse.json(
      { error: "Normal User can not Update" },
      { status: 401 },
    );
  }
  await dbConnect();
  try {
    const {
      recipeID,
      name,
      category,
      image,
      difficulty,
      cookingTimeMinutes,
      ingredients,
    } = await request.json();
    const query: Record<string, any> = {};
    if (name) query.name = name;
    if (category) query.category = category.toLowerCase();
    if (difficulty) query.difficulty = difficulty.toLowerCase();
    if (cookingTimeMinutes) query.cookingTimeMinutes = cookingTimeMinutes;
    if (image) query.image = image;
    if (ingredients) query.ingredients = ingredients;
    if (Object.keys(query).length === 0) {
      return NextResponse.json({ message: "No Update Found" });
    }
    await Recipes.findByIdAndUpdate(recipeID, { $set: query });
    return NextResponse.json(
      { message: "Recipe Details update successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Data not Updated" }, { status: 304 });
  }
}
export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  if (!token || token.isAdmin !== true) {
    return NextResponse.json(
      { error: "Normal User can not Update" },
      { status: 401 },
    );
  }
  await dbConnect();
  try {
    const { recipeID } = await request.json();
    const value = await Recipes.findByIdAndDelete(recipeID);
    return NextResponse.json(
      { message: "Recipe data Deleted Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Recipe does not delete" },
      { status: 404 },
    );
  }
}
