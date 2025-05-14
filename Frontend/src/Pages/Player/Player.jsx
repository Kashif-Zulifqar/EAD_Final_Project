import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure `id` is correct
  const [apiData, SetApidata] = useState(null);

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
        const data = text ? JSON.parse(text) : {}; // ✅ Avoids empty response issue
        console.log("Fetched movie data:", data);
        // Check if the 'results' exists and is an array
        if (
          data.results &&
          Array.isArray(data.results) &&
          data.results.length > 0
        ) {
          SetApidata(data.results[0]); // Get the first result
        } else {
          SetApidata(null); // In case no result is found
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        SetApidata(null); // Fallback to null in case of error
      });
  }, [id]);

  // Ensure we only try to render if apiData is available
  if (!apiData) {
    return <p>Loading movie...</p>; // or your own loading message
  }

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      {apiData.key ? (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          width="80%"
          height="90%"
          title="trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available</p>
      )}

      <div className="details">
        <p className="hovered">Movie Details</p>
        <p>{apiData.name || "No Title"}</p>
        <p>{apiData.type || "No Type Available"}</p>
      </div>
    </div>
  );
};

export default Player;
