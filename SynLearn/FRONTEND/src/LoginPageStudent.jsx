import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import BASE_URL from "./Components/constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { adduser } from "./Components/Utils/UserSlice";


export default function LoginPageStudent() {
  const [userId, setUserId] = useState("11111111110");
  const [password, setPassword] = useState("9874565652");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate input allowing either 11-digit registration or email
  const validateInputs = () => {
    setError("");
    const emailRegex = /^\S+@\S+\.\S+$/;
    const regNumberRegex = /^\d{11}$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!(regNumberRegex.test(userId) || emailRegex.test(userId))) {
      setError("Enter a valid 11-digit registration number or a valid email ID.");
      return false;
    }
    if (!mobileRegex.test(password)) {
      setError("Mobile number (password) must be a valid 10-digit Indian number.");
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateInputs()) return;

    try {
      // Call login API with userId and mobilenumber as password
      const response = await axios.post(
        `${BASE_URL}/login-student`,
        { userId: userId.trim(), mobilenumber: password.trim() },
        { withCredentials: true }
      );

      const student = response.data.student;

      if (!student) {
        setError("Invalid user ID or mobile number.");
        return;
      }

      if (!student.permission) {
        await Swal.fire({
          icon: "warning",
          title: "Not Approved",
          text: "Your account is not approved by admin yet.",
        });
        return;
      }

      // Store student info in Redux
      dispatch(adduser(student));

      // Success alert
      setMessage("Login Successful");
      await Swal.fire({
        icon: "success",
        title: "Welcome",
        text: `Welcome ${student.fullName}`,
      });

      navigate("/studenthome");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Network error: " + (err.message || "Unknown error")
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-sky-700">
          Login to SynLearn
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        {/* User ID Field: accept registration or email */}
        <label className="block mb-2 font-medium">Registration Number / Email ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500"
          placeholder="Enter your 11-digit registration number or email ID"
          required
        />

        {/* Mobile Number as Password */}
        <label className="block mb-2 font-medium">Password</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 pr-10"
            placeholder="Enter your 10-digit mobile number"
            maxLength={10}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-sky-600 hover:text-sky-800 flex items-center justify-center"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-sky-600 text-white p-2 rounded hover:bg-sky-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-500 mt-6">
  Don't have an account?{" "}
  <a href="/register" className="text-blue-600 hover:underline">
    Register
  </a>
</p>

      </form>
    </div>
  );
}
