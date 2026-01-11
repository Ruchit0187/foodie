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
  likes: Types.ObjectId[];
  count: number;
  bookmark: Types.ObjectId[];
  cookingTimeMinutes: number;
}

const recipesSchema: Schema<Irecipes> = new Schema({
  name: String,
  image: String,
  category: String,
  difficulty: String,
  ingredients: [],
  likes: [],
  count: {
    type: Number,
    default: 0,
  },
  bookmark: [],
  cookingTimeMinutes: Number,
});
export const Recipes: Model<Irecipes> =
  mongoose.models.recipes || mongoose.model("recipes", recipesSchema);
