import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 p-2 border-none outline-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-5"
            src="/nano.svg"
            alt="Nanogram Logo"
          />
          <div>
            <h1 className="font-bold nanogram text-3xl">Nanogram</h1>
            <h6 className="text-center text-xs font-extralight pt-1">
              - The Tech Hub -
            </h6>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500 p-1"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500 p-1"
          >
            About Us
          </Link>
          <Link
            to="/events"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500 p-1"
          >
            Events
          </Link>
          <Link
            to="/about-us" // Change this link as needed
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500 px-4 py-2 rounded-full flex items-center transition-colors"
          >
            Join us <UserPlus className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/about-us#contact" // Change this link as needed
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600 transition-colors"
          >
            Contact us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4 text-center">
          <Link
            to="/"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500"
          >
            About Us
          </Link>
          <Link
            to="/events"
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500"
          >
            Events
          </Link>
          <Link
            to="/about-us" // Change this link as needed
            className="hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500 px-4 py-2 rounded-full flex items-center justify-center transition-colors"
          >
            Join us <UserPlus className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/about-us#contact" // Change this link as needed
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            Contact us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
