import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import axios from "axios";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import LogoutPopup from "../PopUp";
const Navbar = () => {
  var { name, email, signstate, setSignstate } = useContext(AuthContext);
  const navRef = useRef();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.user?.name || "Guest");
    } else {
      navigate("/"); // Redirect to Login Page if no user session found
    }
  }, []);
  const handleSignOut = () => {
    sessionStorage.removeItem("user"); // Clear user session
    setShowLogoutPopup(true); // Show popup instead of alert
  };
  const handlePopupClose = () => {
    setShowLogoutPopup(false);
    navigate("/"); // Redirect to Login Page after popup is closed
  };

  // Login Functionality (redirecting to Login page)
  const handleLogin = () => {
    navigate("/"); // Redirect to Login Page
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);
  return (
    <div className="navbar" ref={navRef}>
      <div className="navleft">
        <img src={logo} alt="" />
        <ul>
          <li>
            <a href="#blockbuster">Blockbuster</a>
          </li>
          <li>
            <a href="#netflix">Only on Netflix</a>
          </li>
          <li>
            <a href="#upcoming">Upcoming</a>
          </li>
          <li>
            <a href="#top-picks">Top Picks</a>
          </li>
          {/* <li>My List</li> */}
          {/* <li>Browse by Language</li> */}
        </ul>
      </div>
      <div className="navright">
        {/* <img src={search_icon} alt="" className="icons" /> */}
        {/* <p>Children</p> */}
        {/* <img src={bell_icon} alt="" /> */}
        <div className="navbar-profile">
          <h2>Hi, {userName}</h2>
          <img src={profile_img} alt="sdfs" className="profile" />
          <img src={caret_icon} alt="" className="caret-icon" />
          <div className="dropdown">
            <p onClick={handleSignOut}>Sign Out</p>
            {/* <p onClick={handleLogin}>Login</p> */}
          </div>
          <LogoutPopup isVisible={showLogoutPopup} onClose={handlePopupClose} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
