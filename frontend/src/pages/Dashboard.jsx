import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/privateNavbar";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      navigate("/login");
    } else {
      setUser(u);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100">
      <Navbar />

      {/* Welcome */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Welcome, <span className="text-indigo-600">{user.name}</span> 👋
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Exchange skills, earn time credits, and grow together.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <DashboardCard
          title="Offer Services"
          desc="Share your skills"
          onClick={() => navigate("/offer")}
          iconPath="M14.7 6.3a1 1 0 00-1.4 0l-6 6a1 1 0 000 1.4l2 2a1 1 0 001.4 0l6-6a1 1 0 000-1.4l-2-2z"
        />

        <DashboardCard
          title="Browse Skills"
          desc="Find services"
          onClick={() => navigate("/browse")}
          iconPath="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />

        <DashboardCard
          title="Learning Resources"
          desc="Videos & PDFs"
          onClick={() => navigate("/Resources")}
          iconPath="M12 6l2 4h4l-3 3 1 5-4-2-4 2 1-5-3-3h4l2-4z"
        />

        <DashboardCard
          title="My Profile"
          desc="View credits"
          onClick={() => navigate("/Profile")}
          iconPath="M5.121 17.804A13.937 13.937 0 0112 15c2.42 0 4.68.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />

      </section>

      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank | SkillShare Platform
      </footer>
    </div>
  );
}

function DashboardCard({ title, desc, onClick, iconPath }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 text-center"
    >
      <svg
        className="h-12 w-12 mx-auto text-indigo-600 mb-4 group-hover:scale-110 transition"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>

      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{desc}</p>
    </div>
  );
}

export default Dashboard;
