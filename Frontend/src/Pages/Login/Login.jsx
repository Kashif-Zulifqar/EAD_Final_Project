import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";

const Login = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signstate, setSignstate] = useState("Sign In");
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    setPopupMessage("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const validateName = (name) => {
    return name.trim().length > 0; // Non-empty name
  };

  const performSignIn = async () => {
    try {
      const result = await axios.post("http://localhost:1000/user/signin", {
        email,
        password,
      });

      if (result.status === 200 && result.data?.token) {
        sessionStorage.setItem("user", JSON.stringify(result.data));
        setPopupMessage(
          `Login Successful, Welcome ${result.data.user?.name || "User"}`
        );
        setOpenPopup(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setPopupMessage("Invalid credentials. Please try again.");
        setOpenPopup(true);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      console.error("Login error:", message);
      setPopupMessage(error.response?.data?.message);
      setOpenPopup(true);
    }
  };

  const performSignUp = async () => {
    // Client-side validation
    // if (!validateName(name)) {
    //   setPopupMessage("Name cannot be empty");
    //   setOpenPopup(true);
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   setPopupMessage("Please enter a valid email address");
    //   setOpenPopup(true);
    //   return;
    // }
    // if (!validatePassword(password)) {
    //   setPopupMessage("Password must be at least 6 characters long");
    //   setOpenPopup(true);
    //   return;
    // }
    console.log(name + email + password);

    try {
      const result = await axios.post("http://localhost:1000/user/signup", {
        name,
        email,
        password,
      });
      if (result.data) {
        setPopupMessage(`Congratulations and Welcome, ${name}`);
        setOpenPopup(true);
        clearFields();
        setSignstate("Sign In");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setPopupMessage("Signup failed: Invalid data");
        setOpenPopup(true);
      }
    } catch (error) {
      setPopupMessage(
        error.response?.data?.message || "Signup failed: Server error"
      );
      setOpenPopup(true);
    }
  };

  const user_auth = (e) => {
    e.preventDefault();
    if (signstate === "Sign In") {
      if (email && password) {
        performSignIn();
      } else {
        setPopupMessage("Please fill in all fields");
        setOpenPopup(true);
      }
    } else {
      if (name && email && password) {
        performSignUp();
      } else {
        setPopupMessage("Please fill in all fields");
        setOpenPopup(true);
      }
    }
  };

  return (
    <div
      className="Login"
      style={{
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.4s ease-in-out",
      }}
    >
      <div
        className="login"
        style={{
          // backgroundImage: `url(${isInputFocused ? bulbon : bulboff})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transition: "background-image 0.4s ease-in-out",
        }}
      >
        <div className="login-form">
          <h1>{signstate}</h1>
          <form>
            {signstate === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <button className="sign-button" onClick={user_auth} type="submit">
              {signstate}
            </button>
          </form>

          {openPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>{popupMessage}</p>
                <button onClick={handlePopupClose}>Close</button>
              </div>
            </div>
          )}

          <div className="form-help">
            <div className="remember"></div>
          </div>

          <div className="form-switch">
            {signstate === "Sign In" ? (
              <p style={{ fontSize: "1.1rem", marginTop: "2rem" }}>
                New to Platform?{" "}
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

      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 20px;
          color: black;
          border-radius: 5px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .popup-content p {
          margin: 0 0 20px;
          font-size: 1.2rem;
        }
        .popup-content button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .popup-content button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Login;
