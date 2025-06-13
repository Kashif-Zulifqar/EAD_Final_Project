import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Titlecards from "../../Components/TitleCards/Titlecards";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import movie1 from "../../assets/movie2.jpg";
import movie2 from "../../assets/movie3.jpg";
import movie3 from "../../assets/movie4.jpg";
const Home = () => {
  var { name, email, signstate, setSignstate } = useContext(AuthContext);
  const [currentMovie, setCurrentMovie] = useState({
    title: "Movie1",
    Image: movie1,
    description: "asdfsafdsaddfsadf",
  });
  console.log(email + "in home");
  const MoviePosters = [
    {
      title: "Thor",
      Image: movie1,
      description:
        "Thor, the Norse God of Thunder, is cast out of Asgard and sent to Earth as punishment. Stripped of his powers, he must prove himself worthy to reclaim his hammer and defend Earth from looming cosmic threats.",
    },
    {
      title: "Venom",
      Image: movie2,
      description:
        "When journalist Eddie Brock merges with an alien symbiote, he gains extraordinary powers and becomes Venom — an anti-hero who must battle both internal demons and a sinister organization bent on exploiting the symbiotes.",
    },
    {
      title: "John Wick",
      Image: movie3,
      description:
        "Retired hitman John Wick returns to the underworld after gangsters steal his car and kill his dog — a final gift from his deceased wife. Driven by vengeance, he unleashes a relentless, stylish storm of gun-fu justice.",
    },
    {
      title: "The Protector",
      Image: hero_banner,
      description:
        "A martial artist sets out to retrieve his stolen elephant, a sacred symbol of his homeland. In his quest through the criminal underworld of Bangkok, he exposes a trafficking ring and fights for honor and justice.",
    },
  ];

  console.log("MoviePosters", MoviePosters);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMovie =
        MoviePosters[Math.floor(Math.random() * MoviePosters.length)];
      setCurrentMovie(randomMovie);
    }, Math.floor(Math.random() * 1000) + 3000); // 3 to 4 seconds

    return () => clearInterval(interval);
  }, [MoviePosters]);
  return (
    <>
      <Navbar></Navbar>
      <div className="hero">
        <img src={currentMovie.Image} alt="" className="banner-img" />
        <div className="hero-caption">
          {/* <img src={hero_title} alt="" className="caption-img" /> */}
          <p>
            {currentMovie.title} <br />
            {currentMovie.description}
          </p>

          {/* <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="" /> Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              Info
            </button>
          </div> */}
        </div>
        <div className="more-cards">
          <Titlecards />

          <div id="blockbuster">
            <Titlecards title={"Blockbuster"} category={"top_rated"} />
          </div>

          <div id="netflix">
            <Titlecards title={"Only on Netflix"} category={"popular"} />
          </div>

          <div id="upcoming">
            <Titlecards title={"Upcoming"} category={"upcoming"} />
          </div>

          <div id="top-picks">
            <Titlecards title={"Top Picks for You"} category={"now_playing"} />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Home;
