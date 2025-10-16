import React, { useEffect, useState } from "react";
import FacultySidebar from "./FacultySidebar";
import axios from "axios";
import BASE_URL from "./constants/BASE_URL";
import Swal from "sweetalert2";

// ✅ Simple shimmer component
const ShimmerCard = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm animate-pulse">
    <div className="h-5 bg-gray-300 rounded w-2/3 mb-3"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
    <div className="flex justify-end mt-4 space-x-2">
      <div className="h-8 bg-gray-300 rounded w-16"></div>
      <div className="h-8 bg-gray-300 rounded w-16"></div>
    </div>
  </div>
);

const ShimmerGrid = () => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <ShimmerCard key={i} />
    ))}
  </div>
);

export default function FacultyHome() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("requested");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/students`, { withCredentials: true });
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      Swal.fire("Error", "Failed to load student data.", "error");
    }
    setLoading(false);
  };

  const filteredStudents = students.filter((student) => {
    const val = searchTerm.trim().toLowerCase();
    if (!val) return true;
    return (
      student.fullName?.toLowerCase().includes(val) ||
      student.emailId?.toLowerCase().includes(val) ||
      student.registration?.toLowerCase().includes(val) ||
      student.mobilenumber?.toLowerCase().includes(val) ||
      student.branch?.toLowerCase().includes(val) ||
      String(student.semester)?.toLowerCase().includes(val)
    );
  });

  const groupByPermissionSemesterBranch = (list) => {
    const grouped = { accepted: {}, requested: {} };
    list.forEach((stu) => {
      const permKey = stu.permission ? "accepted" : "requested";
      if (!grouped[permKey][stu.semester]) grouped[permKey][stu.semester] = {};
      if (!grouped[permKey][stu.semester][stu.branch]) grouped[permKey][stu.semester][stu.branch] = [];
      grouped[permKey][stu.semester][stu.branch].push(stu);
    });
    return grouped;
  };

  const groupedStudents = groupByPermissionSemesterBranch(filteredStudents);

  const deleteStudent = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Deleting a student is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });
    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/admin/students/${id}`, { withCredentials: true });
      Swal.fire("Deleted", "Student deleted successfully", "success");
      fetchStudents();
    } catch (err) {
      Swal.fire("Error", "Failed to delete student", "error");
    }
  };

  const acceptStudent = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/admin/students/${id}/accept`, {}, { withCredentials: true });
      Swal.fire("Accepted", "Student has been accepted.", "success");
      fetchStudents();
    } catch (err) {
      Swal.fire("Error", "Failed to accept student", "error");
    }
  };

  const renderStudentCard = (student, section) => (
    <div
      key={student._id}
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5"
    >
      <div className="flex flex-col gap-1 text-gray-800">
        <h3 className="text-lg font-semibold text-gray-900">{student.fullName}</h3>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Email:</span> {student.emailId || "-"}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Mobile:</span> {student.mobilenumber || "-"}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Reg No:</span> {student.registration || "-"}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Roll:</span> {student.roll || "-"}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Branch:</span> {student.branch}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">Semester:</span> {student.semester}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-700">College:</span> {student.collegeName}
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        {section === "requested" && (
          <button
            onClick={() => acceptStudent(student._id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            Accept
          </button>
        )}
        <button
          onClick={() => deleteStudent(student._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );

  const renderGroupedStudents = (section) => {
    const data = groupedStudents[section];
    if (Object.keys(data).length === 0)
      return <p className="text-gray-600 italic mt-4">No students found in this section.</p>;

    return Object.entries(data)
      .sort(([a], [b]) => a - b)
      .map(([sem, branches]) => (
        <div key={sem} className="mb-10">
          <h3 className="text-2xl font-semibold text-sky-700 mb-4 border-l-4 border-sky-500 pl-3">
            Semester {sem}
          </h3>
          {Object.entries(branches).map(([branch, students]) => (
            <div key={branch} className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3 ml-3 underline decoration-sky-400">
                {branch}
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {students.map((student) => renderStudentCard(student, section))}
              </div>
            </div>
          ))}
        </div>
      ));
  };

  return (
    <FacultySidebar>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Management</h1>

        {/* Search */}
        <input
          type="search"
          placeholder="Search by name, email, registration, branch, or semester..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800 shadow-sm"
        />

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-sm  overflow-hidden">
            <button
              className={`px-6 py-2 font-medium transition ${
                activeTab === "requested"
                  ? "bg-sky-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("requested")}
            >
              Requested Students
            </button>
            <button
              className={`px-6 py-2 font-medium transition ${
                activeTab === "accepted"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("accepted")}
            >
              Accepted Students
            </button>
          </div>
        </div>

        {/* Data */}
        <div className="rounded-xl p-6   shadow-inner">
          {loading ? <ShimmerGrid /> : renderGroupedStudents(activeTab)}
        </div>
      </div>
    </FacultySidebar>
  );
}
