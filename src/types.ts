import { ObjectId } from "mongoose";
interface ingredients {
  name: string;
  quantity: string;
}

export interface recipeDataTypes {
  _id: ObjectId;
  category: string;
  difficulty: string;
  image: string;
  ingredients: ingredients[];
  name:string
  cookingTimeMinutes:number
}
export interface recipeRoute{
    filterRecipes:recipeDataTypes[] 
}
