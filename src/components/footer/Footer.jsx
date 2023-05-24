import React from "react";

import "./footer.css";

import { Link } from "react-router-dom";
import logo from "../../assets/sky.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content__logo">
          <div className="logo">
            {<img src={logo} alt="" />}
            MyPage
            <br />
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home </Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">연락처 </Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">자주 본 것</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
