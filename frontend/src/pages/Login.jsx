import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const API =  "timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net"; // backend

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) window.location.href = "/dashboard";
  }, []);

  const login = (e) => {
    e.preventDefault();
    setErrorMsg("");

    fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setErrorMsg(data.message || "Invalid email or password");
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      })
      .catch(() => setErrorMsg("Server error. Please try again."));
  };

  return (
    <div className="bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen flex flex-col">
      {/* Navbar (same look as HTML) */}
      <Navbar type="public" />

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={login}
          className="bg-white/90 backdrop-blur-xl w-full max-w-sm p-8 rounded-3xl shadow-2xl border border-white"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Exchange skills. Earn time credits.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-600 text-sm text-center mb-3">
              {errorMsg}
            </p>
          )}

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-linear-to-r from-indigo-600 to-purple-600
                       text-white w-full py-3 rounded-xl font-semibold
                       hover:from-indigo-700 hover:to-purple-700
                       transition active:scale-95 shadow-lg"
          >
            Login
          </button>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-600">
            New user?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
