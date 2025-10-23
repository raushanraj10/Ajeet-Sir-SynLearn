import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, FileText, FileQuestion, Layers, GraduationCap, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const  isAuthenticated  = useSelector((store) => store?.userdata);

  const semesters = [
    { sem: 1, color: 'from-sky-400 to-teal-400' },
    { sem: 2, color: 'from-teal-400 to-green-400' },
    { sem: 3, color: 'from-green-400 to-emerald-400' },
    { sem: 4, color: 'from-emerald-400 to-cyan-400' },
    { sem: 5, color: 'from-cyan-400 to-sky-400' },
    { sem: 6, color: 'from-sky-400 to-blue-400' },
    { sem: 7, color: 'from-blue-400 to-teal-400' },
    { sem: 8, color: 'from-teal-400 to-green-400' },
  ];

  const features = [
    {
      icon: FileQuestion,
      title: 'Previous Year Questions',
      description: 'Access comprehensive PYQs for better exam preparation',
      color: 'sky',
    },
    {
      icon: FileText,
      title: 'Last Semester Content',
      description: 'Mid-sem and end-sem materials from previous batches',
      color: 'teal',
    },
    {
      icon: BookOpen,
      title: 'Subject Notes',
      description: 'Detailed notes for all subjects across all semesters',
      color: 'green',
    },
    {
      icon: Layers,
      title: 'Module-wise Content',
      description: 'Organized study materials module by module',
      color: 'emerald',
    },
  ];

  const handleSemesterClick = (sem) => {
 navigate(`/branchselectionpage/${sem}`, { state: { semester: sem } });

};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-sky-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent select-none">
                SynLearn
              </span>
            </div>
            {!isAuthenticated&&<button
              onClick={() => navigate('/loginpage')}
              className="px-5 py-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Sign In/Sign Up
            </button>}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
              SynLearn
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your comprehensive learning platform for B.Tech studies. Access PYQs, notes, and study materials curated by faculty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-100"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Select Your Semester
            </h2>
            <p className="text-slate-600">
              Choose your semester to access tailored study materials
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {semesters.map(({ sem, color }) => (
              <button
                key={sem}
                onClick={() => handleSemesterClick(sem)}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-slate-100 hover:border-transparent overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-slate-700 group-hover:text-white transition-colors duration-300 mb-2">
                    {sem}
                  </div>
                  <div className="text-sm font-medium text-slate-500 group-hover:text-white transition-colors duration-300">
                    Semester
                  </div>
                  <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-white absolute top-4 right-4 transform group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Join thousands of students who are excelling in their studies with SynLearn's comprehensive resources
          </p>
          <button
            onClick={() => navigate('/loginpage')}
            className="px-8 py-3 bg-white text-sky-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Get Started Now
          </button>
        </div>
      </div>

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

export default HomePage;
