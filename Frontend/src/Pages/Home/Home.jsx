import React, { useContext, useEffect } from "react";
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
const Home = () => {
  var { name, email, signstate, setSignstate } = useContext(AuthContext);
  console.log(email + "in home");

  return (
    <>
      <Navbar></Navbar>
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
            hic adipisci, impedit quia ipsa nisi debitis, dolores ad omnis ipsam
            earum odio? Neque beatae saepe explicabo optio reprehenderit ipsam!
            Impedit.
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
