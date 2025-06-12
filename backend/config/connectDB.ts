import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGODB_URL || "";
    if (!mongo_url) {
      throw new Error("MONGODB_URL not defined in .env");
    }

    await mongoose.connect(mongo_url);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
