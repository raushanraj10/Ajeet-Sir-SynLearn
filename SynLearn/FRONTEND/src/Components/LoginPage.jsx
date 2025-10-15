import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"
import FacultySidebar from "./FacultySidebar";
import BASE_URL from "./constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addadmin } from "./Utils/AdminSlice";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const Navigate =useNavigate()
  const dispatch =useDispatch()
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userId || !password) {
      setError("Both User ID and Password are required");
      return;
    }
    try {
     const response = await axios.post(`${BASE_URL}/login-admin`, { userId, password }, { withCredentials: true });
       dispatch(addadmin(response.data))
      setMessage("Login Succesfully")
      Navigate("/facultyhome")
     
    } catch (err) {
      setError("Network error: " + err.message);
    }
  }

  return (
 
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-sky-700">
          Login to SynLearn
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        {/* User ID Field */}
        <label className="block mb-2 font-medium">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500"
          placeholder="Enter your UserID"
          required
        />

        {/* Password Field with Eye Icon */}
        <label className="block mb-2 font-medium">Password</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-sky-600 hover:text-sky-800 flex items-center justify-center"
            style={{ top: "50%", transform: "translateY(-50%)" }} // 👈 perfect centering
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-sky-600 text-white p-2 rounded hover:bg-sky-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  
  );
}
