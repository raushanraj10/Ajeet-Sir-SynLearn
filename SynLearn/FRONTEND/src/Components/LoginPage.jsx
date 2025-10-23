import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"
import FacultySidebar from "./FacultySidebar";
import BASE_URL from "./constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addadmin } from "./Utils/AdminSlice";
import { useEffect } from "react";
import { use } from "react";

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
       dispatch(addadmin(response.data.user))
      setMessage("Login Succesfully")
      Navigate("/facultyhome")
     
    } catch (err) {
      setError("Network error: " + err.message);
    }
  }
const student=useSelector((store)=>store?.userdata)
const admin=useSelector((store)=>store?.admindata)
//   useEffect(()=>{
// if(student){
//   return Navigate("/categoriespage")
// }
// if(admin){
//   return Navigate("/facultyhome")
// }

//   },[student,admin])

  return (
 
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../store/userSlice';
// import { GraduationCap, Mail, Lock, ArrowLeft } from 'lucide-react';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       dispatch(setUser({
//         id: '1',
//         name: 'Student Name',
//         email,
//         semester: '5',
//         branch: 'CSE',
//       }));
//       setLoading(false);
//       navigate('/');
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-500 via-teal-400 to-green-400 flex items-center justify-center px-4">
//       <button
//         onClick={() => navigate('/')}
//         className="absolute top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-all"
//       >
//         <ArrowLeft className="h-5 w-5" />
//         <span className="font-medium">Back</span>
//       </button>

//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-3xl shadow-2xl p-8">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <GraduationCap className="h-10 w-10 text-sky-500" />
//               <span className="text-3xl font-bold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
//                 SynLearn
//               </span>
//             </div>
//             <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
//             <p className="text-slate-600">Sign in to access your study materials</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
//                   placeholder="student@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <a href="#" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
//               Forgot your password?
//             </a>
//           </div>

//           <div className="mt-6 pt-6 border-t border-slate-200 text-center">
//             <p className="text-slate-600 text-sm">
//               Don't have an account?{' '}
//               <a href="#" className="text-sky-600 hover:text-sky-700 font-medium">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
