import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");

    console.log("Checking for existing admin user...");
    const existingAdmin = await User.findOne({ username: "admin" });
    console.log("Existing admin user:", existingAdmin);

    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("Admin password not set in environment variables");
    }
    console.log("Admin password loaded:", adminPassword);

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    console.log("Hashed password:", hashedPassword);

    const admin = new User({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user to be created:", admin);

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  }
};

createAdmin();