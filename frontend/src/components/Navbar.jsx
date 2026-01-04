import React from "react";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto w-full px-6 py-5 flex justify-between items-center text-white">
      <h1 className="text-2xl font-extrabold flex items-center gap-2 tracking-wide text-indigo-600">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <a href="/" className="hover:opacity-90 transition">
          TimeBank
        </a>
      </h1>
    </nav>
  );
};

export default Navbar;
