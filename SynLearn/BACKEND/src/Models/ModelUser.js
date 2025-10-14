const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    qualification: {
      type: String,
      required: true,
    },
    subjectExpertise: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    emailId: {
      type: String,
      required: true,
   
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    alternateMobileNumber: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/teacher-concept-illustration_114360-21691.jpg?w=740",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ModelUser = mongoose.model(
  "ModelUser",
  UserSchema
);

module.exports = ModelUser;
