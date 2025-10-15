const express =require("express");
const ModelAdmin = require("../Models/ModelAdmin");
const AuthRouter=express.Router();
const jwt =require("jsonwebtoken");
const upload = require("../middlewares/Multer");

AuthRouter.get("/auth",(req,res)=>{
    res.send("Router Work")
})

// Make it Own required routes with help of this

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

  return res.json({
      success: true,
      message: "Welcome Back!",
      user: check.userId,
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