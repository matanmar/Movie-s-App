import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <header className="header">
        <h1 className="link">
          <Link to="/">Matan's Movies</Link>
        </h1>
        <nav className="links">
          <Link to="/favoriet">⭐Favorite⭐</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
