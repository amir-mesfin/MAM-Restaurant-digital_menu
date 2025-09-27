import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ debug: true });

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MongoDB URI not configured");
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  }
};

export default connectDB;