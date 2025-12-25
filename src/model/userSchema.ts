import mongoose, { Schema, Model, Document } from "mongoose";
interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
});
export const User: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);
