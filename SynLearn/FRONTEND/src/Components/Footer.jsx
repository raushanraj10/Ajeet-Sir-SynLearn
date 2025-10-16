import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200 shadow-inner py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 space-y-3 sm:space-y-0">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-1xl font-semibold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
            SynLearn
          </span>
        </div>

        {/* Divider for mobile */}
        <div className="block sm:hidden w-24 h-[1px] bg-gray-300 rounded-full" />

        {/* Copyright */}
        <p className="text-gray-500 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} SynLearn — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
