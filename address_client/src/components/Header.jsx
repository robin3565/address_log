import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <div className="layoutfix">
          <ul>
            <li>
              <h1>
                <Link to="/">
                  <em>TeamA</em>
                </Link>
              </h1>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "clicked" : "")}
              >
                검색
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notify"
                className={({ isActive }) => (isActive ? "clicked" : "")}
              >
                등록
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const Button = () => {
  return {
    /* <button>
          로그인/회원가입
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button> */
  };
};

export default Header;
