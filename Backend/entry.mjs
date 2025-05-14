import express, { Router } from "express";
import connectDB from "./database.mjs";
import userRoutes from "./Routes/UserRoutes.mjs";
import movieRoutes from "./Routes/MoviesRoutes.mjs";
import cors from "cors";
const PORT = 1000;
const app = express();
app.use(express.json()); //MIDDLEWARE
app.use(cors()); //Middleware
app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
// Start Server
connectDB();
app.listen(PORT, () => console.log("Server running on port 1000"));
