import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import logo from "../../assets/sky.jpg";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "날씨",
    path: "/Weather",
  },
  {
    display: "게임",
    path: "/game",
  },
  {
    display: "유틸",
    path: "/Util",
  },

  {
    display: "로그인",
    path: "/Login",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">경남</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
