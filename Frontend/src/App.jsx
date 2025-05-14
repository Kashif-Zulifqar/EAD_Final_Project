import React from "react";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Player from "./Pages/Player/Player";
import { StateManager } from "./AuthContext";
const App = () => {
  return (
    <>
      <StateManager>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Player/:id" element={<Player />} />
        </Routes>
      </StateManager>
    </>
  );
};
export default App;
