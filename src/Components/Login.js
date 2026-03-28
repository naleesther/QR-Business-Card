import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
  <AuthLayout>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" p-10 rounded-2xl shadow-l w-[400px]">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your details to continue
        </p>

        <div className="mb-4">
          <label>Email or Username</label>
          <input
            className="w-full border p-2 rounded-lg mt-1"
            placeholder="example@email.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded-lg mt-1"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded-lg mt-4 shadow-md"
        >
          Log in
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </AuthLayout>
  );
}
