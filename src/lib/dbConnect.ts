import mongoose from "mongoose";

export async function dbConnect() {
  const databaseUrl = process.env.DATABASE_URL!;
  try {
    await mongoose.connect(databaseUrl);
    console.log("database connect");
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
