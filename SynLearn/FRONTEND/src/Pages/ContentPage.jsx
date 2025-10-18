import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, GraduationCap, FileText, ExternalLink, Download, Search, Filter } from 'lucide-react';
import axios from 'axios';

interface FileData {
  _id: string;
  semester: string;
  branch: string;
  subject: string;
  type: string;
  type2?: string;
  originalFilename: string;
  year: number;
  pdfUrl?: string;
  photoUrl?: string;
  createdAt: string;
}

const ContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const semester = location.state?.semester || 1;
  const category = location.state?.category || 'pyqs';

  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const getCategoryTitle = () => {
    switch (category) {
      case 'pyqs': return 'Previous Year Questions';
      case 'last-sem': return 'Last Semester Content';
      case 'notes': return 'Subject Notes';
      case 'modules': return 'Module Content';
      default: return 'Study Materials';
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [semester, category]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/files`, {
        params: {
          semester,
          type: category,
        },
      });
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from(new Set(files.map(f => f.year))).sort((a, b) => b - a);
  const subjects = Array.from(new Set(files.map(f => f.subject))).sort();

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.originalFilename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || file.year.toString() === selectedYear;
    const matchesSubject = selectedSubject === 'all' || file.subject === selectedSubject;
    return matchesSearch && matchesYear && matchesSubject;
  });

  const groupedFiles = filteredFiles.reduce((acc, file) => {
    const year = file.year.toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(file);
    return acc;
  }, {} as Record<string, FileData[]>);

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
              onClick={() => navigate('/categories', { state: { semester } })}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Categories</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="px-4 py-1 bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 rounded-full">
              <span className="text-white font-semibold text-sm">Semester {semester}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-lg text-slate-600">
            Browse and access study materials
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none appearance-none bg-white transition-all"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none appearance-none bg-white transition-all"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Files Found</h3>
            <p className="text-slate-600">No materials are available for your current selection.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFiles).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, yearFiles]) => (
              <div key={year} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Year {year}</h2>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yearFiles.map((file) => (
                      <div
                        key={file._id}
                        className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl p-6 border-2 border-slate-200 hover:border-sky-400 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        {file.photoUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden bg-white border border-slate-200">
                            <img
                              src={file.photoUrl}
                              alt={file.originalFilename}
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        )}

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-semibold text-sky-600 uppercase tracking-wide mb-1">
                              {file.subject}
                            </div>
                            <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2">
                              {file.originalFilename}
                            </h3>
                          </div>

                          {file.type2 && (
                            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                              {file.type2}
                            </div>
                          )}

                          <div className="flex space-x-2 pt-2">
                            {file.pdfUrl && (
                              <>
                                <a
                                  href={file.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-400 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="text-sm">View</span>
                                </a>
                                <a
                                  href={file.pdfUrl}
                                  download
                                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                  <Download className="h-4 w-4" />
                                </a>
                              </>
                            )}
                            {!file.pdfUrl && (
                              <div className="flex-1 px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm text-center">
                                {file.originalFilename}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage;
