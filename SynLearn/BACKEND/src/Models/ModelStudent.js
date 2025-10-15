const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
 fullName: {
  type: String,
  required: true,
  trim: true,
  set: (v) => v.toUpperCase(),
},
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/, // basic email pattern validation
  },
  registration: {
    type: String,
    trim: true,
    // Required only if semester > 1, enforced via custom validation below
  },
  mobilenumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/, // 10-digit Indian mobile number starting with 6-9
  },
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  branch: {
    type: String,
    required: true,
    enum: [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical and Electronics Engineering",
      "Computer Science and Engineering",
      "Computer Science & Engineering (IoT)",
      "Fire Technology & Safety",
      "Applied Science & Humanities",
    ],
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  roll: {
    type: String,
    required: true,
    trim: true,
  },
  permission:{
    type:Boolean,
    default:false
  }
});

// Custom validator for registration number required if semester > 1
studentSchema.path("registration").validate(function (value) {
  if (this.semester > 1) {
    return value && /^\d{11}$/.test(value);
  }
  return true; // registration not required for semester 1
}, "Registration number is required and must be 11 digits for semesters greater than 1");

const ModelStudent = mongoose.model("ModelStudent", studentSchema);

module.exports = ModelStudent;
