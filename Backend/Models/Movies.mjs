import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  // addedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Reference to User schema
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
