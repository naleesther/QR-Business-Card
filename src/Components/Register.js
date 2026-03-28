import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register/", {
        username,
        password,
      });

      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <AuthLayout>
      <div className="">
        <div className=" p-10 rounded-2xl shadow-l w-[400px]">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-gray-500 text-center mb-6">
            Sign up to get started
          </p>

          <div className="mb-4">
            <label className="text-sm font-medium">Full Name</label>
            <input
              className="w-full border p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Mitchy Matty"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Email or Username</label>
            <input
              className="w-full border p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to="/dashboard">
            <button
              onClick={handleRegister}
              className="w-full bg-blue-400 hover:bg-blue-400 text-white py-2 rounded-lg mt-4 shadow-md transition"
            >
              Sign Up
            </button>
          </Link>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-400 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
  </AuthLayout>
  );
}
