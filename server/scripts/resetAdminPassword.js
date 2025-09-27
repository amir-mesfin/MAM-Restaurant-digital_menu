import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("❌ ADMIN_PASSWORD not found in .env");
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const result = await User.updateOne(
      { username: "admin" },
      { $set: { password: hashedPassword } }
    );

    console.log("✅ Admin password reset done:", result);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting password:", err);
    process.exit(1);
  }
};

resetAdminPassword();
