import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FacultySidebar from "./FacultySidebar";
import BASE_URL from "./constants/BASE_URL";
import { FileText } from "lucide-react";

const docTypes = [
  "Notes",
  "Gate",
  "PSU",
  "Mid Sem Content",
  "End Sem Content",
  "Last Time Content",
];

// Helper to display semester & branch properly
function formatTitle(text) {
  // Replace hyphens with spaces, capitalize each word
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function UploadDocumentPage() {
  const { semester, branch } = useParams();

  const [documents, setDocuments] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchName, setSearchName] = useState("");

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState(docTypes[0]);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch documents when semester or branch changes
  useEffect(() => {
    fetchDocuments();
  }, [semester, branch]);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/documents/${semester}/${branch}`, {
        withCredentials: true,
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setDocuments([]);
    }
  };

const handleDeleteDocument = async (docId) => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this document? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626", // red
    cancelButtonColor: "#6b7280", // gray
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmResult.isConfirmed) return;

  try {
    await axios.delete(`${BASE_URL}/documents/${docId}`, {
      withCredentials: true,
    });
    Swal.fire("Deleted!", "Document has been deleted.", "success");
    // Update documents list after deletion
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== docId));
  } catch (error) {
    console.error("Delete failed:", error);
    Swal.fire("Error", "Failed to delete document. Please try again.", "error");
  }
};


  // Filter & search documents logic
  const filteredDocs = Array.isArray(documents)
    ? documents.filter(
        (doc) =>
          (!filterType || doc.type === filterType) &&
          doc.originalFilename.toLowerCase().includes(searchName.toLowerCase())
      )
    : [];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!file || !fileName || !uploadType) {
      Swal.fire("Error", "Please select file and fill all fields.", "error");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", semester);
    formData.append("branch", branch);
    formData.append("type", uploadType);
    formData.append("originalFilename", fileName);

    try {
      await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      setLoading(false);
      setUploadProgress(0);
      setShowUploadForm(false);
      Swal.fire("Success", "File uploaded successfully!", "success");
      fetchDocuments();
      setFile(null);
      setFileName("");
      setUploadType(docTypes[0]);
    } catch (err) {
      setLoading(false);
      setUploadProgress(0);
      Swal.fire("Error", "Upload failed. Please try again.", "error");
    }
  };

  return (
    <FacultySidebar>
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 space-y-6 min-h-[80vh]">
        {/* Header with formatted semester and branch */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Documents for{" "}
          <span className="text-sky-600 font-bold">
            {formatTitle(semester)}
          </span>{" "}
          -{" "}
          <span className="text-green-600 font-semibold">{formatTitle(branch)}</span>
        </h2>

        {/* Filter, Search and Add button */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">All Types</option>
            {docTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search document name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border rounded px-4 py-2 flex-grow min-w-[250px] focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className={`ml-auto px-6 py-2 rounded text-white ${
              showUploadForm ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            } transition`}
          >
            {showUploadForm ? "Cancel" : "Add Document"}
          </button>
        </div>

       {/* Documents List */}
<div className="overflow-auto max-h-[28rem] bg-gray-100 rounded-xl shadow-inner p-4">
  {filteredDocs.length === 0 ? (
    <p className="text-center text-gray-500 text-lg py-10">
      No documents found.
    </p>
  ) : (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDocs.map((doc) => (
        <li
          key={doc._id}
          className="group flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 break-words text-base md:text-lg">
                {doc.originalFilename}
              </h3>
              <p className="text-sm text-gray-500 italic mt-1">
                Type: {doc.type}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <a
              href={doc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium transition"
            >
              <FileText className="w-5 h-5" />
              <span>View PDF</span>
            </a>

            <button
              onClick={() => handleDeleteDocument(doc._id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition"
              title="Delete Document"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Delete</span>
            </button>
          </div>

          <div className="mt-3 border-t pt-2 text-xs text-gray-400 flex justify-between">
            <span>Uploaded: {new Date(doc.createdAt).toLocaleDateString()}</span>
            <span>Size: {(doc.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


     {/* Upload Form Modal */}
{showUploadForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeIn">
      <h3 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-sky-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
        Upload New Document
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Type</label>
          <select
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {docTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">File Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Enter file name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Select File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
              if (e.target.files[0]) setFileName(e.target.files[0].name);
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {uploadProgress > 0 && (
          <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="absolute top-0 left-0 h-5 bg-gradient-to-r from-green-400 to-sky-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {uploadProgress}%
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-3">
        <button
          onClick={() => setShowUploadForm(false)}
          className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-1/2 py-2 bg-gradient-to-r from-sky-500 to-green-400 text-white font-semibold rounded-lg hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </FacultySidebar>
  );
}
