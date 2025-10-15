import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  ChevronDown,
  ChevronRight,
  LogOut,
  ChevronLeft,
  ChevronRight as ArrowRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "./constants/BASE_URL";

import { useDispatch } from "react-redux";
import axios from "axios";


export default function FacultySidebar({ children }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSemester, setActiveSemester] = useState(null);
  const [activeNoteCategory, setActiveNoteCategory] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

 // Semesters and branches
const semesters = {
  "Semester 1": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 2": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 3": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 4": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 5": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 6": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 7": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ],
  "Semester 8": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Computer Science & Engineering (IoT)",
    "Fire Technology & Safety",
    "Applied Science & Humanities"
  ]
};


  const menuItems = [
    { name: "Home", icon: Home, path: "/facultyhome" },
  ];

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
        return navigate("/")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSemesterToggle = (semester) => {
    setActiveNoteCategory(null);
    setActiveSemester((prev) => (prev === semester ? null : semester));
  };

  const handleNoteCategoryToggle = (category) => {
    setActiveNoteCategory((prev) => (prev === category ? null : category));
  };

  // Render menu function with flag for mobile view
  const renderMenu = (isMobile = false) => (
    <nav className="flex flex-col gap-2 mt-4">
      {/* Static Menu Items */}
      {menuItems.map(({ name, icon: Icon, path }) => {
        const active = location.pathname === path;
        return (
          <button
            key={name}
            onClick={() => {
              navigate(path);
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              active ? "bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white" : "text-gray-900 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            <Icon className="w-5 h-5" />
            {name}
          </button>
        );
      })}

      {/* Semester Dropdowns */}
      {Object.entries(semesters).map(([semester, categories]) => {
        const semesterActive = activeSemester === semester;
        return (
          <div key={semester} className="w-full">
            <button
              onClick={() => handleSemesterToggle(semester)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                semesterActive
                  ? "bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white"
                  : "text-gray-900 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                {semester}
              </span>
              {semesterActive ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Notes Categories Dropdown */}
            {semesterActive && (
              <div className="ml-6 mt-2 flex flex-col gap-1">
                {categories.map((cat, idx) => {
                  const catPath = `/uploaddoc/${semester}/${cat.replace(/\s+/g, "").toLowerCase()}`;
                  const catActive = location.pathname === catPath;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(catPath);
                        if (isMobile) setIsMobileMenuOpen(false);
                        setActiveNoteCategory(cat);
                      }}
                      className={`px-4 py-2 text-sm rounded-lg text-left transition-all duration-200 ${
                        catActive
                          ? "bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white"
                          : "bg-white text-gray-700 hover:bg-sky-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 flex relative">
      {/* Floating Sidebar: 80% viewport height excluding navbar/footer (assumed 4rem navbar + 4rem footer = 8rem) */}
      {/* Adjust top and bottom so sidebar doesn't overlap navbar/footer */}
      <aside
        className="hidden md:flex flex-col justify-between bg-white shadow-xl rounded-2xl border border-gray-200 fixed left-6 top-20"
        style={{
          height: "80vh",
          width: "320px",
          zIndex: 1000,
          background: "linear-gradient(to right, #38bdf8, #2dd4bf, #4ade80)", // sky-500 via teal-400 to green-400
          color: "white",
        }}
      >
        <div className="px-6 py-4 rounded-t-2xl font-semibold tracking-wide text-lg bg-transparent">
          Teacher Panel
        </div>

        <div className="flex-1 px-4 py-2 overflow-y-auto bg-white bg-opacity-90 text-gray-900 rounded-b-2xl">
          {renderMenu()}
        </div>

        <div className="px-6 py-3 border-t border-gray-300 bg-white bg-opacity-90 text-xs text-gray-700 rounded-b-2xl">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-green-600 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <div className="mt-2 text-center">© 2025 Company</div>
        </div>
      </aside>

      {/* Desktop toggle button for collapsing sidebar expanded or minimized (optional) */}
      <button
        onClick={() => setFullscreen(!fullscreen)}
        className="hidden md:flex fixed top-24 left-2 z-40 p-2 rounded-full bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white shadow-lg hover:brightness-110 transition duration-200"
      >
        {fullscreen ? <ArrowRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-24 left-4 z-50 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-20 left-0 w-64 bg-white shadow-lg z-50 transition-transform duration-300"
          style={{ height: "80vh" }}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 text-white rounded-t-2xl">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 space-y-3">{renderMenu(true)}</div>
          <div className="px-6 py-3 border-t border-gray-200 text-xs text-gray-500">
            <button onClick={handleLogout} className="flex items-center gap-2 hover:text-green-600">
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <div className="mt-2 text-center">© 2025 Company</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className="flex-1 p-4 md:pt-24 md:pl-80 md:pr-6"
        style={{ minHeight: "calc(100vh - 8rem)" }}
      >
        <div className="bg-white rounded-2xl shadow-xl h-full border border-gray-200 p-6 overflow-y-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
