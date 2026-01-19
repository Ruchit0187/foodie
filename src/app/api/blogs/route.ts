import { dbConnect } from "@/src/lib/dbConnect";
import { Blogs } from "@/src/model/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = request.nextUrl;
    const limit = Number(searchParams.get("limit"));
    const search = searchParams.get("search")?.trim();
    const query: Record<string, any> = {};
    if (search) query.name = { $regex: search, $options: "i" };
    const blogData = await Blogs.find(query).limit(6 * limit);
    const count = await Blogs.countDocuments();
    // .skip(limit * 6 - 6);
    return NextResponse.json(blogData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const {
      name,
      title,
      category,
      date,
      image,
      quick_summary,
      description,
      health_benefits,
    } = await request.json();
    const insertValue = {
      name,
      title,
      category,
      date,
      image,
      quick_summary,
      description,
      health_benefits,
    };
    const value = await Blogs.insertOne(insertValue);
    console.log(value);
    return NextResponse.json(
      { message: "Data add Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const { blogID } = await request.json();
    console.log(blogID);
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
export async function PATCH(request: NextRequest) {
  await dbConnect();
  try {
    const {
      blogID,
      name,
      title,
      category,
      date,
      image,
      quick_summary,
      description,
      health_benefits,
    } = await request.json();
    console.log(blogID);
    const query: Record<string, any> = {};
    if (name) query.name = name;
    if (category) query.category = category.toLowerCase();
    if (title) query.title = title;
    if (date) query.date = date;
    if (image) query.image = image;
    if (quick_summary) query.quick_summary = quick_summary;
    if (description) query.description = description;
    if (health_benefits) query.health_benefits = health_benefits;
    if (Object.keys(query).length === 0) {
      return NextResponse.json({ message: "No Update Found" });
    }
    const value = await Blogs.findByIdAndUpdate(blogID, { $set: query });
    return NextResponse.json(
      { message: "Recipe Details update successfully", value },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Data not Updated" }, { status: 304 });
  }
}
