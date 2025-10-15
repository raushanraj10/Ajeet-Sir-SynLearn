// src/constants/facultyHomeData.js

const facultyHomeData = {
  facultyName: "Dr. R. K. Sharma",
  department: "Computer Science and Engineering",
  institute: "My Bihar Engineering Institute",

  quickLinks: [
    { title: "Upload Notes", path: "/faculty/upload-notes", icon: "📘" },
    { title: "Upload Question Papers", path: "/faculty/upload-papers", icon: "📄" },
    { title: "Student Results", path: "/faculty/results", icon: "📊" },
    { title: "View Feedback", path: "/faculty/feedback", icon: "💬" },
  ],

  announcements: [
    {
      title: "Mid-Sem Evaluation",
      date: "2025-10-12",
      message: "All faculty are requested to upload mid-sem marks by 18th Oct 2025.",
    },
    {
      title: "Department Meeting",
      date: "2025-10-20",
      message: "CSE department meeting will be held in Room 205 at 11:00 AM.",
    },
  ],

  subjects: [
    {
      code: "CSE301",
      name: "Data Structures",
      semester: "Semester 3",
      totalStudents: 72,
      attendance: "89%",
    },
    {
      code: "CSE402",
      name: "Database Management Systems",
      semester: "Semester 4",
      totalStudents: 68,
      attendance: "85%",
    },
  ],

  facultyStats: {
    totalSubjects: 2,
    totalStudents: 140,
    assignmentsDue: 3,
  },
};

export default facultyHomeData;
