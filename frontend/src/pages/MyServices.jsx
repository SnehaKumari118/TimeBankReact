import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API =  "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net";

export default function MyServices() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [services, setServices] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editHours, setEditHours] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`${API}/my-services/${user.id}`)
      .then(res => res.json())
      .then(setServices);
  }, [navigate, user]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openEdit = (service) => {
    setShowModal(true);
    setEditId(service.id);
    setEditTitle(service.title);
    setEditDesc(service.description);
    setEditHours(service.hours);
  };

const saveEdit = () => {
  fetch(`${API}/service/${editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: editTitle,
      description: editDesc,
      hours: editHours,
      user_id: user.id, // ✅ ADD THIS
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(() => {
      setShowModal(false);
      return fetch(`${API}/my-services/${user.id}`);
    })
    .then(res => res.json())
    .then(setServices)
    .catch(err => alert(err.message));
};


  const deleteService = (id) => {
    if (!window.confirm("Delete this service?")) return;
    fetch(`${API}/service/${id}`, { method: "DELETE" })
      .then(() => setServices(prev => prev.filter(s => s.id !== id)));
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
            <Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
            <Link to="/MyResources" className="hover:text-indigo-600 transition">My Resources</Link>
            <Link to="/UploadResource" className="hover:text-indigo-600 transition">Upload Content</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-indigo-700"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4">
            <Link to="/dashboard" className="block hover:text-indigo-600">Dashboard</Link>
            <Link to="/MyResources" className="block hover:text-indigo-600">My Resources</Link>
            <Link to="/UploadResource" className="block hover:text-indigo-600">Upload Content</Link>
            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* PAGE */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 && (
            <div className="col-span-full text-center bg-white p-6 rounded-xl shadow">
              No services added yet.
            </div>
          )}

          {services.map(s => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.description}</p>
              <p className="text-sm mt-2 font-medium">⏱ {s.hours} hours</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(s)}
                  className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteService(s.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>

            <label className="text-sm text-gray-600">Service Title</label>
            <input
              className="w-full border rounded-lg p-2 mb-3"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />

            <label className="text-sm text-gray-600">Description</label>
            <textarea
              className="w-full border rounded-lg p-2 mb-3"
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
            />

            <label className="text-sm text-gray-600">Hours</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 mb-4"
              value={editHours}
              onChange={e => setEditHours(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank | SkillShare Platform
      </footer>
    </div>
  );
}
