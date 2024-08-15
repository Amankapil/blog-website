import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-800 text-white p-4 flex justify-around">
      <h1 className="text-3xl font-bold">
        <Link to="/">My Blog</Link>
      </h1>
      <button className="btn btn- shadow-sm bg-white rounded-md text-[#000] px-4">
        <Link to="/new-post">add new blog</Link>
      </button>
    </header>
  );
};

export default Header;
