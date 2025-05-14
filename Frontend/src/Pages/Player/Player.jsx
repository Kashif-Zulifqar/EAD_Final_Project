import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure `id` is correct
  const [apiData, SetApidata] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("Fetching movie with ID:", id);

    fetch(`http://localhost:1000/movies/${id}`, {
      method: "GET",
      credentials: "include", // ✅ Allows sending cookies if needed
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        const text = await res.text();
        return text ? JSON.parse(text) : {}; // ✅ Avoids empty response issue
      })
      .then((data) => {
        console.log("Fetched JSON:", data);
        SetApidata(data.results?.[0] || {});
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [id]);

  const searchMovies = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `http://localhost:1000/api/movies/search?query=${query}`
      );
      setMovies(response.data.results); // TMDB API returns results in `results` key
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="80%"
        height="90%"
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className="details">
        <p className="hovered">Movie Details</p>
        <p>{apiData.published_at?.slice(0, 10) || "No Date Available"}</p>
        <p>{apiData.name || "No Title"}</p>
        <p>{apiData.type || "No Type Available"}</p>
      </div>
    </div>
  );
};

export default Player;
