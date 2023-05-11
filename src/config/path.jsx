import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Weather from "../pages/weather";
import Game from "../pages/game";
import Worm from "../components/game/worm";
import Paint from "../pages/paint";

function rou() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/game" element={<Game />} />
        <Route path="/worm" element={<Worm />} />
        <Route path="/paint" element={<Paint />} />
      </Routes>
    </div>
  );
}

export default rou;
