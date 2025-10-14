const express =require("express");
const UploadRouter=express.Router();

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

module.exports = UploadRouter; 
