import mongoose, { Schema, Model, Document } from "mongoose";
interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isVerify: boolean;
  verifyToken: string | undefined;
  verifyTokenExpiry: Date | undefined;
  isAdmin: boolean;
  isOwner: boolean;
  otp?: number | undefined;
  otpExpiry?: Date | undefined;
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  isOwner: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  otpExpiry: Date,
});
export const User: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);
