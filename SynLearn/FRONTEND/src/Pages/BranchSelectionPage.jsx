import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GraduationCap, ChevronRight, Layers, ArrowLeft } from "lucide-react";

const BranchSelectionPage = () => {
  const navigate = useNavigate();
  const { semester } = useParams(); // 🔹 Get semester name/number from URL params
  const isAuthenticated = useSelector((store) => store?.userdata);

  const branches = [
    { name: "Civil Engineering", color: "from-sky-400 to-teal-400" },
    { name: "Mechanical Engineering", color: "from-teal-400 to-green-400" },
    { name: "Electrical and Electronics Engineering", color: "from-green-400 to-emerald-400" },
    { name: "Computer Science and Engineering", color: "from-emerald-400 to-cyan-400" },
    { name: "Computer Science & Engineering (IoT)", color: "from-cyan-400 to-blue-400" },
    { name: "Fire Technology & Safety", color: "from-blue-400 to-teal-400" },
    { name: "Applied Science & Humanities", color: "from-teal-400 to-green-400" },
  ];

  const handleBranchClick = (branch) => {
   navigate(`/categoriespage/${semester}/${branch}`, { state: { semester, branch } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-teal-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-sky-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
                SynLearn
              </span>
            </div>
            {!isAuthenticated && (
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sky-600 hover:text-teal-600 font-medium mb-6 transition-all"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Select Your{" "}
            <span className="bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Branch
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            for <span className="font-semibold text-slate-800">Semester {semester}</span>
          </p>
          <p className="text-slate-500 max-w-3xl mx-auto mt-2">
            Choose your engineering branch to access study materials tailored for this semester.
          </p>
        </div>

        {/* Branch List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Available Branches
            </h2>
            <p className="text-slate-600">
              Explore resources prepared specifically for your department.
            </p>
          </div>

          {/* Branch Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {branches.map(({ name, color }, index) => (
              <button
                key={index}
                onClick={() => handleBranchClick(name)}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-slate-100 hover:border-transparent overflow-hidden text-left"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Layers className="h-8 w-8 text-slate-400 group-hover:text-white transition-colors duration-300" />
                    <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-white transition-colors duration-300">
                    {name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Continue Your Learning Journey
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Choose your branch and dive into semester-specific notes, PYQs, and curated materials designed for you.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white text-sky-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>&copy; 2024 SynLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BranchSelectionPage;
