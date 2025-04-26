import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white hover:text-indigo-400 transition duration-300 cursor-pointer">
          Blog App
        </div>

        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <Link to="/">
            <li className="hover:text-indigo-400 transition duration-300 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to='/profile'>
          <li className="hover:text-indigo-400 transition duration-300 cursor-pointer">
            Profile
          </li>
          </Link>
          <Link to="/blog">
            <li className="hover:text-indigo-400 transition duration-300 cursor-pointer">
              Blogs
            </li>
          </Link>
        </ul>

        <div className="md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border border-red-400 h-10 px-4 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="border border-indigo-400 h-10 px-4 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
