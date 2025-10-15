import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FacultySidebar from "./FacultySidebar";
import BASE_URL from "../constants/BASE_URL"

const docTypes = [
  "Notes",
  "Gate",
  "PSU",
  "Mid Sem Content",
  "End Sem Content",
  "Last Time Content",
];

export default function UploadDocumentPage() {
  const { semester, branch } = useParams();
  
  const [documents, setDocuments] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchName, setSearchName] = useState("");
  
  // for upload dropdown
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState(docTypes[0]);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  // Fetch existing documents for semester & branch
  useEffect(() => {
    fetchDocuments();
  }, [semester, branch]);

  const fetchDocuments = async () => {
    try {
      
      const res = await axios.get(`${BASE_URL}/documents/${semester}/${branch}`, {withCredentials:true})
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  // Filter and search logic
  const filteredDocs = Array.isArray(documents)
  ? documents.filter((doc) => {
      return (
        (!filterType || doc.type === filterType) &&
        doc.originalFilename.toLowerCase().includes(searchName.toLowerCase())
      );
    })
  : [];

  // Upload handler
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
      const res = await axios.post(`${BASE_URL}/upload`, formData, {
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">
        Documents for {semester} - {branch}
      </h2>

      {/* Filter and Search */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded"
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
          className="border rounded px-3 py-2 flex-grow min-w-[250px]"
        />
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {showUploadForm ? "Cancel" : "Add Document"}
        </button>
      </div>

      {/* Documents List */}
      <div className="overflow-auto max-h-96 border rounded p-2">
        {filteredDocs.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredDocs.map((doc) => (
              <li
                key={doc._id}
                className="flex justify-between items-center border-b pb-1"
              >
                <div>
                  <span className="font-semibold">{doc.originalFilename}</span>{" "}
                  <span className="text-xs text-gray-500">
                    ({doc.type})
                  </span>
                </div>
                <a
                  href={doc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline"
                >
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="border rounded p-4 bg-gray-50 space-y-4 max-w-md">
          <h3 className="text-xl font-semibold mb-2">Upload New Document</h3>

          <div>
            <label className="block mb-1 font-medium">Select Type</label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {docTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter file name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select File (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          {uploadProgress > 0 && (
            <div className="relative w-full h-4 bg-gray-300 rounded">
              <div
                className="absolute top-0 left-0 h-4 bg-green-500 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-semibold text-white">
                {uploadProgress}%
              </span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      )}
    </div>
    </FacultySidebar>
  );
}
