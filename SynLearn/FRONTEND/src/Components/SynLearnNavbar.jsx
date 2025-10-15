// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { removeuser } from "./path/to/UserSlice";
// // import { removeadmin } from "./path/to/AdminSlice";

// export default function SynLearnNavbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Detect user and admin in redux (adjust slice names as needed)
//   const user = useSelector((state) => state.userdata);
//   const admin = useSelector((state) => state.admindata);

//   // Collate current user for display
//   let currentUser = null;
//   let currentType = null;
//   if (admin && admin.fullname) {
//     currentUser = admin.fullname;
//     currentType = "admin";
//   } else if (user && user.fullName) {
//     currentUser = user.fullName;
//     currentType = "student";
//   }

//   // Prevent body scroll when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//   }, [isOpen]);

//   // Navigation for "Home"
//   const handleHome = () => {
//     if (currentType === "admin") navigate("/facultyhome");
//     else if (currentType === "student") navigate("/studenthome");
//     setIsOpen(false);
//   };

//   // Logout handler (customize Redux slice clearing as needed)
//   const handleLogout = () => {
//     // dispatch(removeuser());
//     // dispatch(removeadmin());
//     localStorage.clear(); // If you store auth in localStorage/sessionStorage
//     navigate("/"); // Redirect to landing/login page
//     setIsOpen(false);
//     window.location.reload();
//   };

//   const handleSignIn = () => {
//     navigate("/register");
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <span className="text-xl font-semibold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
//                 SynLearn
//               </span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex space-x-6 items-center">
//               {/* Universal menu items if required: */}
//               {/* {["Courses", "About", "Contact"].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
//                 >
//                   {item}
//                 </a>
//               ))} */}

//               {/* Show Home, Name, Logout if logged in; else Sign In */}
//               {currentUser ? (
//                 <>
//                   <button
//                     onClick={handleHome}
//                     className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
//                   >
//                     Home
//                   </button>
//                   <span className="font-semibold text-sky-700">{currentUser}</span>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-gradient-to-r from-sky-500 to-green-400 text-white px-3 py-2 rounded-md font-semibold ml-2 shadow hover:brightness-110 transition"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={handleSignIn}
//                   className="bg-gradient-to-r from-sky-500 to-green-400 text-white px-4 py-2 rounded-md font-semibold shadow ml-2 hover:brightness-110 transition"
//                 >
//                   Sign In
//                 </button>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 aria-label="Toggle menu"
//                 className="p-2 rounded-md text-sky-700 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
//               >
//                 {isOpen ? (
//                   <svg
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isOpen && (
//           <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-1 absolute w-full left-0 top-16 z-50">
//             {["Courses", "About", "Contact"].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="block text-gray-700 hover:bg-sky-100 rounded-md px-3 py-2 transition-colors duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item}
//               </a>
//             ))}
//             {currentUser ? (
//               <>
//                 <button
//                   onClick={handleHome}
//                   className="block w-full text-left text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
//                 >
//                   Home
//                 </button>
//                 <div className="mt-2 mb-2 px-3 text-sky-700 font-semibold">{currentUser}</div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-gradient-to-r from-sky-500 to-green-400 text-white px-3 py-2 rounded-md font-semibold shadow hover:brightness-110 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleSignIn}
//                 className="w-full bg-gradient-to-r from-sky-500 to-green-400 text-white px-4 py-2 rounded-md font-semibold shadow hover:brightness-110 transition"
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Padding to offset fixed navbar height for the page content */}
//       <div className="pt-16" />
//     </>
//   );
// }



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeuser } from "./Utils/UserSlice";
import { removeadmin } from "./Utils/AdminSlice";
import axios from "axios";
import BASE_URL from "./constants/BASE_URL";
// import { removeuser } from "./path/to/UserSlice";
// import { removeadmin } from "./path/to/AdminSlice";

export default function SynLearnNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Detect user and admin in redux (adjust slice names as needed)
  const user = useSelector((state) => state?.userdata);
  const admin = useSelector((state) => state?.admindata);
console.log(admin)
  // Display name and user type logic
  let currentUser = null;
  let currentType = null;
  if (admin && admin.fullName) {
  currentUser = admin.fullName;
  currentType = "admin";
}
 else if (user && user.fullName) {
    currentUser = user.fullName;
    currentType = "student";
  }

  // Home navigation based on user type
  const handleHome = () => {
    if (currentType === "admin") navigate("/facultyhome");
    else if (currentType === "student") navigate("/studenthome");
  };

  // Logout logic (attach redux clear if desired)
const handleLogout = async () => {
  try {
    await axios.get(`${BASE_URL}/logout`, { withCredentials: true });

    // Clear redux
    dispatch(removeuser());
    dispatch(removeadmin());

    // Navigate based on who was logged in
    if (admin && admin.fullName) {
      return navigate("/login-by-admin"); // or any admin login landing page
     // or student login landing page
    } else {
      return navigate("/"); // default landing page
    }
   
  } catch (e) {
    console.error("Logout failed:", e);
  }
};


  const handleSignIn = () => {
    navigate("/register");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
                SynLearn
              </span>
            </div>
            {/* Menu - always visible, flex wrap for mobile */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Static/public menu options can be included here */}
              {/* {["Courses", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))} */}
              {/* Show Home, Name, Logout if logged in; else Sign In */}
              {currentUser ? (
                <>
                  <button
                    onClick={handleHome}
                    className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    Home
                  </button>
                  <span className="font-semibold text-sky-700">{currentUser}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-sky-500 to-green-400 text-white px-3 py-2 rounded-md font-semibold shadow ml-1 hover:brightness-110 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-sky-500 to-green-400 text-white px-4 py-2 rounded-md font-semibold shadow hover:brightness-110 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Padding to offset fixed navbar height for the page content */}
      <div className="pt-16" />
    </>
  );
}
