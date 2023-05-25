import React, { Component } from "react";
import { Link } from "react-router-dom";
import background from "../assets/switch.webp";
import "../components/game/game.css";

export class Game extends Component {
  render() {
    return (
      <div className="game-list">
        <h1 className="game-title">지렁이게임</h1>
        <h2>
          <Link to="/worm" className="game-link">
            Play
          </Link>
        </h2>
        <h1 className="game-title">크롬다이노</h1>
        <h2>
          <Link to="/dino" className="game-link">
            Play
          </Link>
        </h2>
      </div>
    );
  }
}

export default Game;
