import React, { Component } from "react";
import { Link } from "react-router-dom";
import background from "../assets/switch.webp";

export class Game extends Component {
  render() {
    return (
      <div
        className="Worm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          background: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 style={{ color: "white", textShadow: "2px 2px 4px black" }}>지렁이게임</h1>
        <h2>
          <Link to="/worm">Play</Link>
        </h2>
      </div>
    );
  }
}

export default Game;
