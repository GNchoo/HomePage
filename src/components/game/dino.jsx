import React, { useEffect } from "react";
import ChromeDinoGame from "react-chrome-dino";
import "./dino.css";

const App = () => {
  return (
    <div className="game-container">
      <div className="board">
        <ChromeDinoGame />
      </div>
    </div>
  );
};

export default App;
