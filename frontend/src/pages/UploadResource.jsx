import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API =  "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net";

export default function UploadResource() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("video");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) navigate("/login");
    else setUser(u);
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const uploadResource = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file_type", fileType);
    formData.append("resource", file);

    fetch(`${API}/upload-resource`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Resource uploaded successfully!");
          navigate(0); // reload current route
        } else {
          alert("Upload failed");
        }
      });
  };

  if (!user) return null;

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

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <Link to="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <Link to="/MyResources" className="hover:text-indigo-600 transition">
              My Resources
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-3xl text-indigo-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4">
            <Link to="/dashboard" className="block hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/MyResources" className="block hover:text-indigo-600">
              My Resources
            </Link>
            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* FORM */}
      <div className="flex justify-center px-4 mt-12">
        <div className="bg-white/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl p-8 border border-white">

          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
            Upload Resource
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Share your knowledge with the community
          </p>

          <form onSubmit={uploadResource} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-600">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Java Basics"
                className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Brief description"
                className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Resource Type</label>
              <select
                value={fileType}
                onChange={e => setFileType(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-white"
              >
                <option value="video">🎥 Video</option>
                <option value="pdf">📄 PDF</option>
                <option value="text">📝 Text</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Upload File</label>
              <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                className="mt-1 w-full text-sm border border-dashed border-gray-400 rounded-xl p-3 bg-gray-50 cursor-pointer
                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
                required
              />
            </div>

            <button
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold
              hover:from-indigo-700 hover:to-purple-700 transition transform active:scale-95 shadow-lg"
            >
              🚀 Upload Resource
            </button>

          </form>
        </div>
      </div>

      <footer className="text-center text-gray-500 py-6 mt-10">
        © 2026 TimeBank | SkillShare Platform
      </footer>
    </div>
  );
}
