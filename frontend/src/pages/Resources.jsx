import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API =  "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net";

export default function LearningResources() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");

    fetch(API + "/resources")
      .then(res => res.json())
      .then(data => setResources(data));
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

         <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-extrabold flex items-center gap-2 cursor-pointer text-indigo-700"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            TimeBank
          </h1>

          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link to="/MyResources" className="hover:text-indigo-600">My Resources</Link>
            <Link to="/UploadResource" className="hover:text-indigo-600">Upload</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <button
            className="md:hidden text-3xl text-indigo-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/90 px-6 py-4 space-y-4">
            <Link to="/dashboard" className="block">Dashboard</Link>
            <Link to="/MyResources" className="block">My Resources</Link>
            <Link to="/UloadResource" className="block">Upload</Link>
            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">📚 Learning Resources</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(r => (
            <div key={r.id} className="bg-white rounded-2xl shadow flex flex-col">
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{r.title}</h3>
                <p className="text-sm text-gray-500">{r.description}</p>
                <p className="text-xs text-indigo-600 mt-1">By {r.name}</p>
              </div>

              <a
                href={`${API}/uploads/${r.file_path}`}
                target="_blank"
                rel="noreferrer"
                className="px-4"
              >
                {r.file_type === "video" ? (
                  <video className="h-48 w-full object-cover rounded-lg" muted />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400">
                    Open {r.file_type.toUpperCase()}
                  </div>
                )}
              </a>

              <div className="mt-auto px-4 py-3 bg-gray-50 text-xs flex justify-between">
                <span>{r.file_type.toUpperCase()}</span>
                <span>TimeBank</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank
      </footer>
    </div>
  );
}
