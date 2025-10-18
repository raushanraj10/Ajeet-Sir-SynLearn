import { useNavigate, useLocation } from 'react-router-dom';
import { FileQuestion, FileText, BookOpen, Layers, ArrowLeft, GraduationCap } from 'lucide-react';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const semester = location.state?.semester || 1;

  const categories = [
    {
      id: 'pyqs',
      title: 'Previous Year Questions',
      description: 'Access PYQs for mid-sem and end-sem examinations',
      icon: FileQuestion,
      color: 'from-sky-400 to-blue-500',
      bgLight: 'bg-sky-50',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-600',
    },
    {
      id: 'last-sem',
      title: 'Last Semester Content',
      description: 'Previous batch mid-sem and end-sem materials',
      icon: FileText,
      color: 'from-teal-400 to-cyan-500',
      bgLight: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-600',
    },
    {
      id: 'notes',
      title: 'Subject Notes',
      description: 'Comprehensive notes for all subjects',
      icon: BookOpen,
      color: 'from-green-400 to-emerald-500',
      bgLight: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
    },
    {
      id: 'modules',
      title: 'Module Content',
      description: 'Module-wise organized study materials',
      icon: Layers,
      color: 'from-emerald-400 to-teal-500',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600',
    },
  ];

 const handleCategoryClick = (categoryId) => {
  navigate('/content', { state: { semester, category: categoryId } });
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
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 rounded-full mb-4">
            <span className="text-white font-bold text-lg">Semester {semester}</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Choose Your Study Category
          </h1>
          <p className="text-xl text-slate-600">
            Select the type of content you want to access
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 ${category.borderColor} overflow-hidden text-left`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${category.bgLight} flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300`}>
                  <category.icon className={`h-8 w-8 ${category.textColor} group-hover:text-white transition-colors duration-300`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>

                <p className="text-slate-600 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center space-x-2 text-slate-500 group-hover:text-white transition-colors duration-300">
                  <span className="font-medium">View Content</span>
                  <ArrowLeft className="h-5 w-5 rotate-180 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-teal-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Quick Tip</h3>
              <p className="text-slate-600 leading-relaxed">
                All materials are organized by subject and year. You can preview PDFs before downloading them.
                Make sure to check both mid-sem and end-sem content for comprehensive preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
