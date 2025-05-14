import React, { useEffect, useRef, useState } from "react";
import "./Titlecards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";
const Titlecards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApidata] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWQ5ZDNjOWM5NjNmMmExNDU4NWZkZDlmMzNiYmZmNiIsIm5iZiI6MTczMzQwMDU5Ny44NTEsInN1YiI6IjY3NTE5ODE1OGUwMzNlOTEzNmRjNmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWshqrfL_F6ZmFQxrd7i4V_BcMlT71B8RcTqGeP8pcQ",
    },
  };

  function handleKeyDown(event) {
    // Check if the pressed key is Left or Right arrow
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();

      // Determine scroll direction and amount
      const scrollAmount = event.key === "ArrowLeft" ? -100 : 100;

      // Scroll the container horizontally
      if (cardsRef.current) {
        cardsRef.current.scrollLeft += scrollAmount;
      }
    }
  }

  // Add event listener when component mounts
  useEffect(() => {
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("keydown", handleKeyDown);

      // Make sure the container is focusable
      currentRef.tabIndex = 0;
    }

    // Cleanup event listener when component unmounts
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApidata(res.results))
      .catch((err) => console.error(err));

    // cardsRef.current.addEventListener("wheel", handlewheel);
  }, []);
  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/Player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt="jjj"
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Titlecards;
