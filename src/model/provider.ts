import mongoose, { Schema, Model, Document } from "mongoose";
interface IGoogle extends Document {
  email: string;
  name: string;
  isAdmin: boolean;
  isOwner: boolean;
  isVerify: boolean;
}

const googleSchema: Schema<IGoogle> = new Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  isVerify: {
    type: Boolean,
    default: true,
  },
});
export const Provider: Model<IGoogle> =
  mongoose.models.oauth || mongoose.model<IGoogle>("oauth", googleSchema);
