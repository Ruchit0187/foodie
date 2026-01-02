import { dbConnect } from "@/src/lib/dbConnect";
import { Recipes } from "@/src/model/recipeSchema";
import { User } from "@/src/model/userSchema";
import { message } from "antd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {email,recipeID}=await request.json();
        const userID=await User.findOne({email});
        const recipeData=await Recipes.findById(recipeID);
        recipeData?.userid?.push(userID?._id);
        console.log(recipeData)
        return NextResponse.json({message:"like your recipe"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"User not Log in"},{status:500})
    }
}