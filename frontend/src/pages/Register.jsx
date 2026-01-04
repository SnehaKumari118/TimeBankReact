import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch(
         "https://timebank-ang2a2c2cubxfzb4.eastasia-01.azurewebsites.net/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) throw new Error();
      await res.json();

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="bg-linear-to-r from-indigo-100 via-purple-200 to-pink-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center flex-1 px-4">
        <form
          onSubmit={register}
          className="bg-white/90 backdrop-blur-xl w-full max-w-sm p-8 rounded-3xl shadow-2xl border border-white"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Join TimeBank and start sharing skills
            </p>
          </div>

          {/* Inputs */}
          <input
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white w-full py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition active:scale-95 shadow-lg"
          >
            Register
          </button>

          {/* Messages */}
          {success && (
            <p className="text-green-600 text-sm text-center mt-4">
              Registration successful! Redirecting to login...
            </p>
          )}

          {error && (
            <p className="text-red-600 text-sm text-center mt-3">
              Registration failed. Please try again.
            </p>
          )}

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
