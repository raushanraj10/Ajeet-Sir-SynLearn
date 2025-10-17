const mongoose = require("mongoose");

const TeacherFileSchema = new mongoose.Schema({
  // teacherName: { type: String },
  semester: { type: String, required: true },
  branch: { type: String, required: true },
  subject:{type:String ,required:true},
  type: { type: String, required: true },
  type2: { type: String,},
  originalFilename: { type: String, required: true },
  year:{type:Number,required:true},
  pdfUrl: { type: String},
  photoUrl: { type: String }, // optional if uploading photo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ModelTeacherFile", TeacherFileSchema);
