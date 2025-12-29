import mongoose, { Schema, Document, Model } from "mongoose";
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
}

const recipesSchema: Schema<Irecipes> = new Schema({
  name: String,
  image: String,
  category: String,
  difficulty: String,
  ingredients: [],
});
export const Recipes: Model<Irecipes> =
  mongoose.models.recipes || mongoose.model("recipes", recipesSchema);
