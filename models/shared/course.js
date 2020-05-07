const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: String,
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    departmentName: String,
    department: {
      type: String,
      ref: "AcademicDepartment",
      required: true,
    },
    type: {
      type: String,
      enum: ["UG", "PG"],
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    admissionOpen: {
      type: Boolean,
      default: false,
    },
    admissionLastDate: {
      type: Date,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Course", schema);
