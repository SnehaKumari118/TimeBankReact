import { useEffect, useState } from "react";

const API = "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net";

const Browse = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /* FETCH SERVICES */
  useEffect(() => {
    fetch(API + "/services")
      .then(res => res.json())
      .then(setServices)
      .catch(() => setServices([]));

    fetch(API + "/resources")
      .then(res => res.json())
      .then(setResources)
      .catch(() => setResources([]));
  }, []);

  /* FILTER SERVICES */
  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(search) ||
    s.description.toLowerCase().includes(search)
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-md">
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <a href="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </a>
            <a href="/browse" className="hover:text-indigo-600 transition">
              Browse Skills
            </a>
            <a href="/profile" className="hover:text-indigo-600 transition">
              Profile
            </a>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-3xl text-indigo-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4 shadow rounded-b-xl">
            <a href="/dashboard" className="block hover:text-indigo-600">
              Dashboard
            </a>
            <a href="/browse" className="block hover:text-indigo-600">
              Browse Skills
            </a>
            <a href="/profile" className="block hover:text-indigo-600">
              Profile
            </a>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* PAGE CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Browse Skills
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Learn from shared skills and resources by the community
          </p>
        </div>

        {/* SEARCH */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
          placeholder="🔍 Search skills (Web, Java, Design...)"
          className="
            w-full mb-8 border border-gray-300 rounded-xl p-4 text-base
            focus:ring-2 focus:ring-indigo-400 focus:outline-none
            shadow-sm bg-white/90 backdrop-blur transition
          "
        />

        {/* SKILLS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredServices.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No skills available
            </p>
          )}

          {filteredServices.map(s => {
            const related = resources.filter(r => r.user_id === s.user_id);

            return (
              <div
                key={s.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {s.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {s.description}
                </p>

                <span className="inline-block mt-3 bg-indigo-100 px-3 py-1 rounded font-medium">
                  ⏱ {s.hours} Hours
                </span>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Resources
                  </h4>

                  {related.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No resources
                    </p>
                  )}

                  {related.map(r => (
                    <a
                      key={r.id}
                      href={`${API}/uploads/${r.file_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-indigo-600 hover:underline"
                    >
                      📄 {r.title}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank | SkillShare Platform
      </footer>
    </div>
  );
};

export default Browse;
