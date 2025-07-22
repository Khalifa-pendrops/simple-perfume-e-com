import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDatase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("This MongoDB Database has been connected successfully 🚀");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
