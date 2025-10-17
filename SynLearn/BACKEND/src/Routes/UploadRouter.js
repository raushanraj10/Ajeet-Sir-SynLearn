const express =require("express");
const upload = require("../middlewares/Multer");
const { uploadOnCloudinary } = require("../config/Cloudinary");
const ModelTeacherFile = require("../Models/ModelTeacherFile");


const UploadRouter=express.Router();




// 📌 Single file upload
UploadRouter.post(
  "/uploadfromfaculty",
  upload.single("file"),
  async (req, res) => {
    try {
 
      const { semester, branch, originalFilename,type,type2,subject,year } = req.body;
  
      // Upload file to Cloudinary
      const result = await uploadOnCloudinary(req.file.path);
   
      // Save to MongoDB
      const model = new ModelTeacherFile({
        semester,
        branch,
        originalFilename,
        pdfUrl: result.secure_url, // ✅ consistent
        type,
        type2,
        subject,
        year
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
    // console.log("Received:", semester, branch);

    const data = await ModelTeacherFile.find({ semester, branch });
    res.send(data);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


UploadRouter.delete("/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find document in database
    const document = await ModelTeacherFile.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Optional: Delete file from cloud storage here if needed
    
    // Delete document record
    await ModelTeacherFile.findByIdAndDelete(id);

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = UploadRouter; 
