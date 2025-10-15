const express =require("express");
const ModelStudent = require("../Models/ModelStudent");
const ModelTeacherFile = require("../Models/ModelTeacherFile");
const ProfileRouter=express.Router();

ProfileRouter.get("/admin/students", async (req, res) => {
  try {
    const students = await ModelStudent.find({});
    res.json(students);
  } catch (err) {
    console.error("Fetch students error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// PATCH /admin/students/:id/accept
ProfileRouter.patch("/admin/students/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await ModelStudent.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.permission = true;
    await student.save();

    res.json({ message: "Student accepted successfully" });
  } catch (err) {
    console.error("Accept student error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// DELETE /admin/students/:id
ProfileRouter.delete("/admin/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await ModelStudent.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await ModelStudent.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Delete student error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const normalizeBranch = (branch) => branch.toLowerCase();

// GET /student/documents?semester=Semester%201&branch=civil-engineering&type=Notes
ProfileRouter.get("/student/documents", async (req, res) => {
  try {
    const { semester, branch, type } = req.query;

    if (!semester || !branch || !type) {
      return res.status(400).json({ message: "semester, branch and type query params required" });
    }

    // Find documents matching filters
    const docs = await ModelTeacherFile.find({
      semester: semester.trim(),
      branch: branch.trim(),
      type: type.trim(),
    }).sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    console.error("Fetch documents error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=ProfileRouter