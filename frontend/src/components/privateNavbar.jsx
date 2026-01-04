import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-extrabold flex items-center gap-2 cursor-pointer text-indigo-700"
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
          <Link to="/MyResources" className="hover:text-indigo-600 transition">My Resources</Link>
          <Link to="/UploadResource" className="hover:text-indigo-600 transition">Upload Content</Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl text-indigo-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4">
          <Link to="/contact" className="block hover:text-indigo-600">Contact</Link>
          <Link to="/MyResources" className="block hover:text-indigo-600">My Resources</Link>
          <Link to="/UploadResource" className="block hover:text-indigo-600">Upload Content</Link>

          <button
            onClick={logout}
            className="w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
