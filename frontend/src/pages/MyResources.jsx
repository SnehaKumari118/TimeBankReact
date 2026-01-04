import { useEffect, useState } from "react";

const API = "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net";

const MyResources = () => {
  const [resources, setResources] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: null, title: "", description: "" });

  const user = JSON.parse(localStorage.getItem("user"));

  /* AUTH CHECK */
  useEffect(() => {
    if (!user) {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, []);

  /* LOAD RESOURCES */
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/my-resources/${user.id}`)
      .then(res => res.json())
      .then(data => setResources(Array.isArray(data) ? data : []));
  }, []);

  /* DELETE */
  const deleteResource = (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    fetch(`${API}/delete-resource/${id}/${user.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Deleted successfully");
          setResources(resources.filter(r => r.id !== id));
        } else {
          alert("Delete failed");
        }
      });
  };

  /* OPEN MODAL */
  const openEdit = (r) => {
    setEditData({ id: r.id, title: r.title, description: r.description || "" });
    setEditModal(true);
  };

  /* SAVE EDIT */
  const saveEdit = () => {
    fetch(`${API}/update-resource/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editData.title,
        description: editData.description,
        userId: user.id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Updated successfully");
          setEditModal(false);
          window.location.reload();
        } else {
          alert("Update failed");
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1
            className="text-2xl font-extrabold flex items-center gap-2 cursor-pointer text-indigo-700"
            onClick={() => window.location.href = "/dashboard"}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            TimeBank
          </h1>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:block">
            <a href="/UploadResource" className="hover:text-indigo-600 transition">
              Upload New
            </a>
          </div>

          {/* HAMBURGER */}
          <button className="md:hidden text-indigo-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`${menuOpen ? "flex" : "hidden"} md:hidden flex-col mx-4 mt-3 bg-white/90 backdrop-blur rounded-xl shadow overflow-hidden`}>
          <button
            onClick={() => window.location.href = "/UploadResource"}
            className="block w-full text-left px-4 py-3 hover:bg-indigo-50 font-medium"
          >
            Upload New
          </button>
        </div>
      </nav>

      {/* PAGE */}
      <main className="max-w-6xl mx-auto px-4 py-10 flex-1">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          My Uploaded Resources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {resources.length === 0 && (
            <div className="col-span-full text-center text-gray-500 bg-white p-10 rounded-2xl shadow-lg">
              No resources uploaded yet
            </div>
          )}

          {resources.map(r => (
            <div key={r.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 w-[300px] flex flex-col overflow-hidden">

              {/* HEADER */}
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                  {r.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {r.description || "No description provided"}
                </p>
              </div>

              {/* PREVIEW */}
              <div className="p-4">
                <div className="h-44 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center">
                  {r.file_type === "video" ? (
                    <video controls className="w-full h-full object-cover">
                      <source src={`${API}/uploads/${r.file_path}`} />
                    </video>
                  ) : r.file_type === "pdf" ? (
                    <iframe src={`${API}/uploads/${r.file_path}`} className="w-full h-full" />
                  ) : (
                    <span className="text-gray-400 text-sm">No preview</span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center px-5 py-3 mt-auto border-t bg-gray-50 text-sm">
                <button
                  onClick={() => openEdit(r)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteResource(r.id)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        © 2026 TimeBank
      </footer>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold mb-5 text-gray-800"> Edit Resource</h3>

            <input
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={editData.title}
              onChange={e => setEditData({ ...editData, title: e.target.value })}
            />

            <textarea
              rows="4"
              className="w-full border rounded-lg p-3 mb-5 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={editData.description}
              onChange={e => setEditData({ ...editData, description: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResources;
