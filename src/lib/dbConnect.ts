import mongoose from "mongoose";

type connectionObject = { isConnected?: number };
const connection: connectionObject = {};
export async function dbConnect() {
  const databaseUrl = process.env.DATABASE_URL!;
  if (connection.isConnected) {
    console.log("database already connected");
    return;
  }
  try {
    const database = await mongoose.connect(databaseUrl);
    connection.isConnected = database.connections[0].readyState;
    console.log("database connect");
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
