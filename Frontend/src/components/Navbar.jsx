import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-emerald-700 text-white"
      : "text-emerald-700 hover:bg-emerald-100";
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/students"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isActive(
                "/students"
              )}`}
            >
              Students
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-colors ${isActive(
                "/about"
              )}`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
