import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Home", "Projects", "About", "Contact"];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg ${
          darkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold drop-shadow-lg hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">
                NextGen<span className="text-yellow-300">Sites</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="px-3 py-1 rounded-md hover:text-yellow-300 hover:shadow-md hover:shadow-yellow-200/50 transition duration-300"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300 mr-2"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-300" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-200" />
              )}
            </button>

            {/* Hamburger Icon for mobile */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <svg
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Side Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-lg"
            : "bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg"
        } transform transition-transform duration-300 z-60 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="text-white text-3xl font-bold hover:text-yellow-300"
          >
            &times;
          </button>
        </div>
        <nav className="flex flex-col space-y-6 px-6 mt-10 text-xl font-semibold">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Transparent Blurred Overlay */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-50 backdrop-blur-md ${
            darkMode
              ? "bg-black bg-opacity-20"
              : "bg-white bg-opacity-20"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
