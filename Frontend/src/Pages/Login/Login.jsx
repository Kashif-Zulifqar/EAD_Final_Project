import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Login.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
const Login = () => {
  var {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    signstate,
    setSignstate,
  } = useContext(AuthContext);

  const navigate = useNavigate(); // Hook for navigation

  // Sign-Up Logic
  const signUp = async (name, email, password) => {
    const user = await axios.post("http://localhost:1000/user/signup", {
      name,
      email,
      password,
    });
    if (user) {
      clearFields();
    }
  };

  // Sign-In Logic
  const signIn = async (email, password) => {
    const singuser = await axios.post("http://localhost:1000/user/signin", {
      email,
      password,
    });
    console.log(singuser);
    if (singuser) {
      console.log("success");
      navigate("/home");
    } else {
      console.log("unsuccessful");
    }
  };

  // Clear Input Fields
  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  // User Authentication Handler
  const user_auth = (event) => {
    event.preventDefault();

    if (signstate === "Sign In") {
      signIn(email, password);
    } else {
      signUp(name, email, password);
      setSignstate("Sign In");
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-form">
        <p>{signstate}</p>
        <form>
          {signstate === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="sign-button" onClick={user_auth} type="submit">
            {signstate}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signstate === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignstate("Sign Up");
                  clearFields();
                }}
              >
                Sign up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setSignstate("Sign In");
                  clearFields();
                }}
              >
                Sign in Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
