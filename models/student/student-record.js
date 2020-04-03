const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    admSession: {
      type: String,
      required: true
    },
    session: {
      type: String,
      required: true
    },
    enrollmentNo: String,
    rollNo: String,
    student: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student"
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course"
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    resultStatus: {
      type: String,
      required: true,
      default: 'PENDING' // 'PASS', 'FAIL'
    },
    Remarks: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentRecord", schema);
