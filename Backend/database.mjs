import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.Mongo_URI;

async function connectDB() {
  // console.log("in connect db");
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Failed:", err.message));
}

export default connectDB; // Export the connection
