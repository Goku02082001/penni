import React, { useState } from "react";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const res = await axios.post("https://penni.onrender.com/api/login",{
        email:form.email,
        password:form.password
      });
      console.log("Login successful:", res.data);
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid credentials!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          SignIn
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
             onChange={handleChange}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password" 
              value={form.password}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>
        <Link to="/signUp">
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span className="text-indigo-600 hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
