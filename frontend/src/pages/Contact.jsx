import { useState } from "react";

const API ="http://localhost:3000";

const Contact = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(API + "/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          ...form,
        }),
      });

      const data = await res.json();
      alert(data.message || "Message sent successfully");

      setForm({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      alert("Error sending message");
    }
  };

  return (
    <div className="bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen flex flex-col">

      {/* ================= NAVBAR (CONTACT ONLY) ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1
            className="text-2xl font-extrabold flex items-center gap-2 cursor-pointer text-indigo-700"
            onClick={() => window.location.href = "/dashboard"}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 0 0118 0z"
              />
            </svg>
            TimeBank
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <a href="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </a>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-3xl text-indigo-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white/90 backdrop-blur px-6 py-4 space-y-4">
            <a href="/dashboard" className="block hover:text-indigo-600">
              Dashboard
            </a>

            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      {/* ================= END NAVBAR ================= */}


      {/* CONTACT FORM */}
      <div className="flex-1 flex justify-center items-center mt-10 px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg border border-gray-200">

          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Get in Touch
          </h2>

          <p className="text-center text-gray-500 mb-8">
            We'd love to hear from you! Send us your doubt below.
          </p>

          <form onSubmit={sendMessage}>
            <input
              name="name"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border w-full p-4 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
            />

            <input
              name="phone"
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border w-full p-4 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
            />

            <input
              name="subject"
              required
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="border w-full p-4 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
            />

            <textarea
              name="message"
              rows="5"
              required
              placeholder="Your Doubt"
              value={form.message}
              onChange={handleChange}
              className="border w-full p-4 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              Send Doubt
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6">
        © 2026 TimeBank | SkillShare Platform
      </footer>

    </div>
  );
};

export default Contact;
