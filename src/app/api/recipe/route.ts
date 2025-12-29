import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { NextResponse } from "next/server";
export async function GET() {
  await dbConnect();
  try {
    const userData = await Recipes.find();
    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
