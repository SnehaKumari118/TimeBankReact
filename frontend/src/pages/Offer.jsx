import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API =  "timebank-backend-acgwa3dahgctcbfp.eastasia-01.azurewebsites.net";

export default function OfferService() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/login");
  }, [navigate]);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  function toggleMenu() {
    document.getElementById("mobileMenu")?.classList.toggle("hidden");
  }

  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  function addService(e) {
    e.preventDefault();
    const u = getUser();
    if (!u) {
      alert("Please login first");
      return;
    }

    fetch(API + "/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: u.id,
        user_name: u.name,
        title: document.getElementById("title")?.value,
        description: document.getElementById("description")?.value,
        hours: document.getElementById("hours")?.value,
      }),
    })
      .then(res => res.json())
      .then(() => alert("Service Added"))
      .catch(() => alert("Error adding service"));
  }

  function generateAI(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description");

    if (!title) {
      alert("Please enter service title first");
      return;
    }

    description.value = "Generating with AI...";

    fetch(API + "/generate-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) description.value = data.description;
        else {
          description.value = "";
          alert("AI failed");
        }
      })
      .catch(() => {
        description.value = "";
        alert("Server error");
      });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">

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

          <div className="hidden md:flex gap-6 items-center font-medium">
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/MyServices")}>My Services</button>
            <button onClick={() => navigate("/MyResources")}>My Resources</button>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </div>

          <button
            className="md:hidden text-3xl text-indigo-700"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>

        <div
          id="mobileMenu"
          className="hidden md:hidden px-4 pb-4 space-y-3 bg-white/90 backdrop-blur shadow rounded-b-xl"
        >
          <button onClick={() => navigate("/dashboard")} className="block">
            Dashboard
          </button>
          <button onClick={() => navigate("/MyResources")} className="block">
            My Resources
          </button>
          <button onClick={() => navigate("/UploadResource")} className="block">
            Upload Content
          </button>
          <button
            onClick={logout}
            className="w-full bg-red-500 py-2 rounded-lg text-white"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* FORM */}
      <form onSubmit={addService} className="space-y-5">
        <div className="flex justify-center items-center px-4 py-14">
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">

            <h2 className="text-3xl font-extrabold mb-8 text-center">
              Offer a Service
            </h2>

            <div className="space-y-5">
              <input
                id="title"
                type="text"
                placeholder="e.g. Web Development"
                className="border rounded-xl p-3 w-full"
                required
              />

              <button
                onClick={generateAI}
                className="w-full bg-indigo-50 text-indigo-700 font-semibold py-2 rounded-lg"
              >
                ✨ Generate Description with AI
              </button>

              <textarea
                id="description"
                rows="4"
                placeholder="Describe your service"
                className="border rounded-xl p-3 w-full"
                required
              />

              <input
                id="hours"
                type="number"
                min="1"
                placeholder="1"
                className="border rounded-xl p-3 w-full"
              />

              <button
                id="addServiceBtn"
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white
                           w-full py-3 rounded-xl font-semibold shadow-lg"
              >
                Add Service
              </button>
            </div>

          </div>
        </div>
      </form>

      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank | SkillShare Platform
      </footer>
    </div>
  );
}
