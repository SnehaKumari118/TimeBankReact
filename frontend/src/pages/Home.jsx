import React from "react";

const Home = () => {
  const toggleMenu = () => {
    document.getElementById("mobileMenu").classList.toggle("hidden");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAVBAR */}
        <nav className="max-w-7xl mx-auto w-full px-6 py-5 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            TimeBank
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/login" className="hover:text-indigo-300 transition">
              Login
            </a>
            <a
              href="/register"
              className="bg-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobileMenu"
          className="hidden md:hidden px-6 pb-6 text-white space-y-4"
        >
          <a href="/login" className="block hover:text-indigo-300">
            Login
          </a>
          <a
            href="/register"
            className="block bg-indigo-600 py-2 rounded-lg text-center hover:bg-indigo-700"
          >
            Sign Up
          </a>
        </div>

        {/* HERO SECTION */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Share Skills.
            <br />
            <span className="text-indigo-400">Support Each Other.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
            TimeBank is built on trust and community. Share what you know, learn
            from others, and grow stronger together by exchanging time and
            skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/login"
              className="bg-indigo-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="/register"
              className="border border-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
