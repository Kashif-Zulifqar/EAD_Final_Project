import express, { Router } from "express";
import connectDB from "./database.mjs";
import userRoutes from "./Routes/UserRoutes.mjs";
import movieRoutes from "./Routes/MoviesRoutes.mjs";
import cors from "cors"; // Import CORS middleware
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  credentials: true, // Allow credentials to be sent with the request
};

app.use(cors(corsOptions)); // Apply CORS with the options
const PORT = 1000;
app.use(express.json()); //MIDDLEWARE
app.use(cors(corsOptions)); // Apply the CORS configuration
app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
// Start Server
connectDB();
app.listen(PORT, () => console.log("Server running on port 1000"));
