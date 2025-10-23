const express =require("express");
const ModelStudent = require("../Models/ModelStudent");
const ModelTeacherFile = require("../Models/ModelTeacherFile");
const ModelAdmin = require("../Models/ModelAdmin");
const UserAuth = require("../middlewares/UserAuth");
const ProfileRouter=express.Router();


ProfileRouter.get("/getadminprofile", UserAuth, async (req, res) => {
  try {
    const decoded = req.decode; // From JWT
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Fetch full admin details from DB
    const adminData = await ModelAdmin.findOne({ userId: decoded.userId }).select("userId fullName _id");

    if (!adminData) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.json(adminData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Get single student profile by registration
ProfileRouter.get("/getstudentprofile", UserAuth, async (req, res) => {
  try {
   const decoded = req.decode; // From JWT
    if (!decoded || decoded.role !== "student") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    // console.log(decoded)
    const data = await ModelStudent.findOne({ registration:decoded.registration });
    if (!data) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.json({
      success: true,
      message: "Welcome Back!",
      user: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


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

// Express route
ProfileRouter.get("/student/documents", async (req, res) => {
  try {
 
    const { semester, branch, type } = req.query;
  
     let finalsemester="Semester "+semester
     let finalbranch=branch
     if(branch==="computer-science-&-engineering-(iot)")
      finalbranch="computer-science-and-engineering-iot"
    if (!semester || !branch || !type) {
      return res.status(400).json({ message: "semester, branch and type query params required" });
    }
    console.log(type)
    // Find documents matching filters
    const docs = await ModelTeacherFile.find({
      semester:finalsemester,
      branch:finalbranch,
      type,
    })

    res.json(docs);
  } catch (err) {
    console.error("Fetch documents error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports=ProfileRouter