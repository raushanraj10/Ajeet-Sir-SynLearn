import React, { useState, useEffect } from "react";

export default function SynLearnNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open (optional)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
                SynLearn
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {["Home", "Courses", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-md text-sky-700 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-1">
            {["Home", "Courses", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 hover:bg-sky-100 rounded-md px-3 py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Padding to offset fixed navbar height for the page content */}
      <div className="pt-16" />
    </>
  );
}
