// src/pages/FacultyHome.jsx
import React from "react";
import facultyHomeData from "./facultyHomeData";
import FacultySidebar from "./FacultySidebar";

export default function FacultyHome() {
  const { facultyName, department, institute, quickLinks, announcements, subjects, facultyStats } =
    facultyHomeData;

  return (
    <FacultySidebar>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{facultyName}</h1>
      <p className="text-gray-600">{department} — {institute}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Quick Links</h2>
      <ul className="grid grid-cols-2 gap-3">
        {quickLinks.map((link, i) => (
          <li key={i} className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
            <span className="mr-2">{link.icon}</span>{link.title}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Announcements</h2>
      <ul>
        {announcements.map((a, i) => (
          <li key={i} className="border-l-4 border-blue-500 pl-3 mb-3">
            <p className="font-semibold">{a.title} <span className="text-sm text-gray-500">({a.date})</span></p>
            <p>{a.message}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Subjects</h2>
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Name</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Students</th>
            <th className="p-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{s.code}</td>
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.semester}</td>
              <td className="p-2">{s.totalStudents}</td>
              <td className="p-2">{s.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6 mb-2">Faculty Stats</h2>
      <div className="flex gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">Subjects: {facultyStats.totalSubjects}</div>
        <div className="bg-gray-100 p-4 rounded-lg">Students: {facultyStats.totalStudents}</div>
        <div className="bg-gray-100 p-4 rounded-lg">Assignments Due: {facultyStats.assignmentsDue}</div>
      </div>
    </div>
    </FacultySidebar>
  );
}
