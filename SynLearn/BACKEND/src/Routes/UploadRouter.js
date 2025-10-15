const express =require("express");
const upload = require("../middlewares/Multer");
const { uploadOnCloudinary } = require("../config/Cloudinary");
const ModelTeacherFile = require("../Models/ModelTeacherFile");


const UploadRouter=express.Router();




// 📌 Single file upload
UploadRouter.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
 
      const { semester, branch, originalFilename,type } = req.body;
  
      // Upload file to Cloudinary
      const result = await uploadOnCloudinary(req.file.path);
   
      // Save to MongoDB
      const model = new ModelTeacherFile({
        semester,
        branch,
        originalFilename,
        pdfUrl: result.secure_url, // ✅ consistent
        type
      });

      await model.save();

      res.json("Uploaded");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);



UploadRouter.post(
  "/uploadpic/:registration",
  upload.single("file"),
  async (req, res) => {
    try {
      const result = await uploadOnCloudinary(req.file.path);
      const {registration}=req.params
      const data=await ModelStudentRegistration({registration})
      data.photourl=result.secure_url
      data.save()
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);


// 📌 Multiple files upload
UploadRouter.post("/uploads", upload.array("files", 5), async (req, res) => {
  try {
    const results = await Promise.all(
      req.files.map((file) => uploadOnCloudinary(file.path))
    );
    res.json(
      results.map((r) => ({ url: r.secure_url, public_id: r.public_id }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

UploadRouter.get("/documents/:semester/:branch", async (req, res) => {
  try {
    const { semester, branch } = req.params; // ✅ Correct
    console.log("Received:", semester, branch);

    const data = await ModelTeacherFile.find({ semester, branch });
    res.send(data);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = UploadRouter; 
