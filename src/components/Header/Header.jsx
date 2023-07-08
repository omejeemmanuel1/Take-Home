import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="topnav">
          <div className="container">
            <div className="dflex">
              <p className="pfont">Call Me: +2348164189594</p>
            </div>
          </div>
        </div>

        <div className="navigation">
          <div className="navcenter">
            <Link to="/" className="logo">
              <h1>Take-Home</h1>
            </Link>
            <ul className="navlist">
              <li className="navitem">
                <Link to="/login" className="navlink">
                  Register/Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
