import axios from "axios";
import Movie from "../Models/Movies.mjs"; // Assuming you named your schema files accordingly

// Create a new movie
export const SearchMovie = async (req, res) => {
  const { query } = req.query;
  console.log("Query " + query);

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`, // ✅ Correct API
      {
        params: {
          api_key: "49d9d3c9c963f2a14585fdd9f33bbff6", // ✅ Use API Key
          query: query,
        },
      }
    );
    res.status(203).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  console.log("Before ");

  const { id } = req.params;
  console.log("After id  ");

  try {
    const movies = await axios
      .get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWQ5ZDNjOWM5NjNmMmExNDU4NWZkZDlmMzNiYmZmNiIsIm5iZiI6MTczMzQwMDU5Ny44NTEsInN1YiI6IjY3NTE5ODE1OGUwMzNlOTEzNmRjNmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWshqrfL_F6ZmFQxrd7i4V_BcMlT71B8RcTqGeP8pcQ",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie videos:", error);
      });
    // Populate user details
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update movie by ID
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie updated", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
