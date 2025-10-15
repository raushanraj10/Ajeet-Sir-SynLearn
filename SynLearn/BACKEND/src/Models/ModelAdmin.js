const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
   userId:{type:String,required:true},
   password:{type:String,require:true}
  },
  { timestamps: true }
);

const ModelAdmin = mongoose.model(
  "ModelAdmin",
  AdminSchema
);

module.exports = ModelAdmin;
