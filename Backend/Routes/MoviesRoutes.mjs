import express from "express";
import {
  SearchMovie,
  getMovies,
  updateMovie,
} from "../Controller/Movies.Controller.mjs";

const router = express.Router();

router.post("/search", SearchMovie);
router.get("/:id", getMovies);
router.put("/", updateMovie);

export default router;
