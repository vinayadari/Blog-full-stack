import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env for local development (Vercel injects env vars in production)
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database sucessfully!");
  } catch (err) {
    console.error();
  }
};

export default connectDB;
