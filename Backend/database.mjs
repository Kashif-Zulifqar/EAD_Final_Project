import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://bhuttokashifali957:mongodb%4012@cluster0.puflo.mongodb.net/";

async function connectDB() {
  // console.log("in connect db");
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Failed:", err.message));
}

export default connectDB; // Export the connection
