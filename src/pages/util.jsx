import React, { Component } from "react";
import { Link } from "react-router-dom";
import background from "../assets/tool.jpg";

export class Util extends Component {
  render() {
    return (
      <div
        className="util"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 style={{ color: "white", textShadow: "2px 2px 4px black" }}>그림판</h1>
        <h2>
          <Link to="/Paint">사용</Link>
        </h2>
        <h1 style={{ color: "white", textShadow: "2px 2px 4px black" }}>계산기</h1>
        <h2>
          <Link to="/Cal">사용</Link>
        </h2>
      </div>
    );
  }
}

export default Util;
