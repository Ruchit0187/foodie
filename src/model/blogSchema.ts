import mongoose, { Model, Schema, Types } from "mongoose";
export interface Iblog extends Document {
  name: string;
  title: string;
  category: string;
  date: string;
  image: string;
  quick_summary: string;
  health_benefits: string[];
  blog_likes: Types.ObjectId[];
  description: string;
  bookmark:Types.ObjectId[]
}
const blogSchema: Schema<Iblog> = new Schema({
  name: String,
  title: String,
  category: String,
  date: String,
  image: String,
  quick_summary: String,
  health_benefits: [],
  blog_likes: [],
  description: String,
  bookmark:[]
 
});
export const Blogs: Model<Iblog> =
  mongoose.models.blogs || mongoose.model("blogs", blogSchema);
