import React, { useState } from "react";

import StartlexImage from "../../assets/logo/logo.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (API call, validation, etc.)
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-sm shadow-least w-full max-w-md">
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-center">
          Starlex Networks
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Forgot password?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
