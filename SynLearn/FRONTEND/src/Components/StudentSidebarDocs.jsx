import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  Star,
  Layers,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "./constants/BASE_URL";

const docTypes = [
  "Last Time Content",
  "Notes",
  "Gate",
  "PSU",
  "Mid Sem Content",
  "End Sem Content",
];

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const isToday = (dateStr) => {
  const today = new Date();
  const d = new Date(dateStr);
  return (
    today.getFullYear() === d.getFullYear() &&
    today.getMonth() === d.getMonth() &&
    today.getDate() === d.getDate()
  );
};

export default function StudentSidebarDocs() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userdata);
  const { semester, branch } = user || {};

  // Responsive sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [activeDocType, setActiveDocType] = useState(docTypes[0]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester || !branch) return;
    fetchDocuments();
    // eslint-disable-next-line
  }, [semester, branch, activeDocType]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/student/documents`, {
        params: {
          semester: `Semester ${semester}`,
          branch: slugify(branch),
          type: activeDocType,
        },
        withCredentials: true,
      });
      setDocuments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setDocuments([]);
    }
    setLoading(false);
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-green-50 to-green-100 flex flex-col">
      {/* Top Header */}
      <div className="flex items-center gap-3 px-4 sm:px-8 pt-8 pb-4">
        <Layers className="w-10 h-10 text-sky-600 bg-white shadow rounded-lg p-2" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-700">Study Resources</h1>
          <p className="text-gray-500 sm:text-lg text-base">
            Semester {semester} - {branch}
          </p>
        </div>
        {/* Mobile sidebar open button */}
        <button
          className="ml-auto md:hidden block"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon className="w-8 h-8 text-sky-500" />
        </button>
      </div>

      <div className="w-full flex-1 flex flex-col md:flex-row justify-center gap-8 pb-12">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex w-full max-w-xs rounded-2xl bg-white shadow-md p-6 flex-col items-start h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-green-500" />
            <h2 className="font-semibold text-lg text-gray-800">Categories</h2>
          </div>
          <nav className="flex flex-col gap-3 w-full">
            {docTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveDocType(type)}
                className={`w-full text-left px-5 py-2 rounded-xl font-semibold transition ${
                  activeDocType === type
                    ? "bg-gradient-to-r from-sky-500 to-green-400 text-white shadow"
                    : "hover:bg-green-50 text-gray-800"
                }`}
                style={{ fontSize: "1.13rem" }}
              >
                {type}
              </button>
            ))}
          </nav>
        </aside>

        {/* Sidebar Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex" onClick={() => setSidebarOpen(false)}>
            <aside
              className="w-11/12 max-w-xs bg-white shadow-md rounded-r-2xl p-6 flex flex-col h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-green-500" />
                <h2 className="font-semibold text-lg text-gray-800">Categories</h2>
                <button className="ml-auto" onClick={() => setSidebarOpen(false)}>
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <nav className="flex flex-col gap-3 w-full">
                {docTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setActiveDocType(type);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2 rounded-xl font-semibold transition ${
                      activeDocType === type
                        ? "bg-gradient-to-r from-sky-500 to-green-400 text-white shadow"
                        : "hover:bg-green-50 text-gray-800"
                    }`}
                    style={{ fontSize: "1.13rem" }}
                  >
                    {type}
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Section */}
        <main className="flex-1 max-w-3xl px-3 sm:px-0 mx-auto">
          {/* Section Heading */}
          <div className="mt-3 mb-5">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
              {activeDocType}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <Clock className="w-5 h-5" />
              <span>Recently uploaded documents</span>
            </div>
          </div>

          {/* Documents List */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {loading ? (
              <div className="text-center text-gray-400 py-8">Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No documents found for this category.</div>
            ) : (
              documents
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((doc) => (
                  <div
                    key={doc._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow-md hover:shadow-lg px-4 sm:px-7 py-4 sm:py-6 transition cursor-pointer"
                    onClick={() => window.open(doc.pdfUrl, "_blank")}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="flex items-center justify-center bg-green-100 rounded-lg p-2">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-gray-900 break-all">{doc.originalFilename}</div>
                        <div className="text-gray-500 text-sm sm:text-base font-medium mt-1">
                          {doc.type} &nbsp; &middot; &nbsp; {formatDate(doc.createdAt)}
                        </div>
                      </div>
                    </div>
                    {isToday(doc.createdAt) && (
                      <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full text-xs sm:text-sm mt-3 sm:mt-0 sm:ml-8">
                        New
                      </span>
                    )}
                  </div>
                ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
