import React, { useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import axios from "axios";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
const Navbar = () => {
  var { name, email, signstate, setSignstate } = useContext(AuthContext);
  const navRef = useRef();
  const navigate = useNavigate();
  const GetUser = async () => {
    var user = await axios.get(`http://localhost:1000/user/${email}`);
    console.log(name + "dfs" + "User got " + user.email);
  };
  GetUser();
  // Sign Out Functionality
  const handleSignOut = () => {
    localStorage.removeItem("currentUser"); // Clear user session
    alert("You have been logged out successfully!");
    navigate("/"); // Redirect to Login Page
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
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          {/* <li>My List</li> */}
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navright">
        {/* <img src={search_icon} alt="" className="icons" /> */}
        {/* <p>Children</p> */}
        {/* <img src={bell_icon} alt="" /> */}
        <div className="navbar-profile">
          <h2>{name}</h2>
          <img src={profile_img} alt="sdfs" className="profile" />
          <img src={caret_icon} alt="" className="caret-icon" />
          <div className="dropdown">
            <p onClick={handleSignOut}>Sign Out</p>
            <p onClick={handleLogin}>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
