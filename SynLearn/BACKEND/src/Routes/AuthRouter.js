const express =require("express");
const ModelAdmin = require("../Models/ModelAdmin");
const AuthRouter=express.Router();
const jwt =require("jsonwebtoken");
const upload = require("../middlewares/Multer");
const ModelStudent = require("../Models/ModelStudent");

// POST /register-student
AuthRouter.post("/register-student", async (req, res) => {
  try {
    const {
      fullName,
      emailId,
      registration, // fixed spelling here from 'registratin'
      mobilenumber,
      collegeName,
      gender,
      branch,
      semester,
      roll,
    } = req.body;

    // Check if email or mobile number already exists
    const existingStudent = await ModelStudent.findOne({
      $or: [{ registration}],
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Email or Mobile number already registered.",
      });
    }

    // Create new student document
    const newStudent = new ModelStudent({
      fullName,
      emailId,
      registration,
      mobilenumber,
      collegeName,
      gender,
      branch,
      semester,
      roll,
    });

    await newStudent.save();
    

    res.status(201).json({ message: "Student registered successfully." });
  } catch (error) {
    console.error("Register Student error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


AuthRouter.post("/check-existence", async (req, res) => {
  try {
    const { registration } = req.body;

    if (!registration) {
      return res.status(400).json({ message: "Registration number is required." });
    }

    const exists = await ModelStudent.exists({ registration });

    res.json({ exists: Boolean(exists) });
  } catch (error) {
    console.error("Check existence error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST /login-student
AuthRouter.post("/login-student", async (req, res) => {
  try {
    const { userId, mobilenumber } = req.body;

    if (!userId || !mobilenumber) {
      return res.status(400).json({ message: "User ID (registration/email) and mobile number are required." });
    }

    // Find student by registration or emailId, and mobilenumber
    const student = await ModelStudent.findOne({
      mobilenumber,
      $or: [{ registration: userId }, { emailId: userId.toLowerCase() }],
    });

    if (!student) {
      return res.status(401).json({ message: "Invalid User ID or mobile number." });
    }

    // Check permission
    if (!student.permission) {
      return res.status(403).json({ message: "Your account is not approved by admin yet." });
    }
      const token = await jwt.sign(
  { registration:userId, role: "student" },
  process.env.Jwt_secret
);
   res.cookie("token", token, {
    secure:true,
    sameSite:"none",
       maxAge: 2 * 24 * 60 * 60 * 1000
});
    // Authentication success - send student data
    res.json({ student });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


AuthRouter.post("/login-admin", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const check = await ModelAdmin.findOne({ userId:userId });
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

if(password!==check.password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Create JWT
    const token = await jwt.sign(
  { userId: check.userId, role: "admin" },
  process.env.Jwt_secret
);
   res.cookie("token", token, {
    secure:true,
    sameSite:"none",
       maxAge: 2 * 24 * 60 * 60 * 1000
});
const final =await ModelAdmin.findOne({userId}).select("userId _id fullName")
  return res.json({
      success: true,
      message: "Welcome Back!",
      user: final,
    });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

AuthRouter.get("/logout",async (req,res)=>{
    res.cookie("token","",{maxAge:0})
    res.send("Logout Successfully")
})






module.exports=AuthRouter