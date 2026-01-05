import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const API = "http://localhost:3000";

export default function Profile() {
  const navigate = useNavigate();

  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [profile, setProfile] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const editFormRef = useRef(null);

  useEffect(() => {
    if (!user) navigate("/login");
    else loadProfile();
  }, [navigate, user]);

  const loadProfile = () => {
    fetch(`${API}/user/${user.id}`)
      .then(res => res.json())
      .then(setProfile)
      .catch(console.error);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const deleteProfile = () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    fetch(`${API}/delete-user/${user.id}`, { method: "DELETE" }).then(() => {
      localStorage.clear();
      navigate("/register");
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(editFormRef.current);
    formData.append("id", user.id);

    fetch(`${API}/update-profile`, {
      method: "POST",
      body: formData,
    }).then(() => {
      setModalOpen(false);
      loadProfile();
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


          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/MyResources">My Resources</Link>
            <Link to="/MyServices">Services</Link>
            <Link to="/UploadResource">Upload Content</Link>
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
          <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/MyResources">My Resources</Link>
            <Link to="/MyServices">Services</Link>
            <Link to="/UploadResource">Upload Content</Link>
            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* PROFILE CARD */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
<img
  className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
  src={
    profile.profile_pic
      ? `${API}/uploads/${profile.profile_pic}`
      : "/defaultAvatar.jpg"
  }
  alt="Profile"
/>


            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>

              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>📍 {profile.location || "-"}</p>
                <p>⭐ {profile.experience_level || "-"}</p>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-700">About Me</h3>
            <p className="text-gray-600 mt-1">
              {profile.bio || "No bio added"}
            </p>
          </div>

          {/* SKILLS */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700">Skills Offered</h4>
              <p className="text-gray-600">{profile.skills_offered || "-"}</p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700">Skills Needed</h4>
              <p className="text-gray-600">{profile.skills_needed || "-"}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </button>

            <button
              onClick={deleteProfile}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
    <form
      ref={editFormRef}
      onSubmit={handleEditSubmit}
      className="bg-white p-6 rounded-2xl w-full max-w-md"
    >
      <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

      <input
        name="name"
        defaultValue={profile.name}
        placeholder="Name"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        name="email"
        defaultValue={profile.email}
        placeholder="Email"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        name="location"
        defaultValue={profile.location}
        placeholder="Location"
        className="w-full border p-2 mb-2 rounded"
      />

      <select
        name="experience_level"
        defaultValue={profile.experience_level}
        className="w-full border p-2 mb-2 rounded"
      >
        <option value="">Experience Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <textarea
        name="bio"
        defaultValue={profile.bio}
        placeholder="Bio"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        name="skills_offered"
        defaultValue={profile.skills_offered}
        placeholder="Skills Offered"
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        name="skills_needed"
        defaultValue={profile.skills_needed}
        placeholder="Skills Needed"
        className="w-full border p-2 mb-2 rounded"
      />
      <input type="file" name="profile_pic" className="mb-3" />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="border px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  </div>
)}
    </div>
  );
}
