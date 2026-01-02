import mongoose, { Schema, Document, Model, Types } from "mongoose";
export interface Ingredients {
  name: string;
  quantity: string;
}
export interface Irecipes extends Document {
  name: string;
  image: string;
  category: string;
  difficulty: string;
  ingredients: Ingredients[];
  userid: Types.ObjectId[];
}

const recipesSchema: Schema<Irecipes> = new Schema({
  name: String,
  image: String,
  category: String,
  difficulty: String,
  ingredients: [],
  userid:[]
});
export const Recipes: Model<Irecipes> =
  mongoose.models.recipes || mongoose.model("recipes", recipesSchema);
