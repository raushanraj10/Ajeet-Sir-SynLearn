const express =require("express");
const AuthRouter=express.Router();

AuthRouter.get("/auth",(req,res)=>{
    res.send("Router Work")
})

// Make it Own required routes with help of this

// AuthRouter.post("/loginstudent", async (req, res) => {
//   try {
//     const { userId, password } = req.body;

//     const check = await ModelStudentRegistration.findOne({ registration:userId });
//     if (!check) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found.",
//       });
//     }
//   const formattedDob = moment(check.dob).format("DD/MM/YYYY");
// if(formattedDob!==password) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password. Please try again.",
//       });
//     }

//     // Create JWT
//     const token = await jwt.sign(
//   { registration: check.registration, role: "student" },
//   process.env.Jwt_secret
// );
//    res.cookie("token", token, {
//     secure:true,
//     sameSite:"none",
//        maxAge: 2 * 24 * 60 * 60 * 1000
// });

//     const final = await ModelStudentRegistration.findOne({ registration: userId })
//     return res.json({
//       success: true,
//       message: "Welcome Back!",
//       user: final,
//     });
//   } catch (err) {
//     // console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error. Please try again later.",
//     });
//   }
// });

AuthRouter.get("/logout",async (req,res)=>{
    res.cookie("token","",{maxAge:0})
    res.send("Logout Successfully")
})

module.exports=AuthRouter