const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect image, video, pdf, etc.
    });
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  } finally {
    // ✅ Clean up local file (async, non-blocking)
    try {
      if (fs.existsSync(localFilePath)) {
        await fs.promises.unlink(localFilePath);
        // console.log("Deleted local file:", localFilePath);
      }
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
  }
};

module.exports = { uploadOnCloudinary };
