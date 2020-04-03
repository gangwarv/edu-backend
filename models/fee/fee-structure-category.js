const mongoose = require("mongoose");

// 
const schema = new mongoose.Schema(
  {
    // Admission-Session
    fsSession: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true
    },
    feeItem: {
      type: mongoose.Types.ObjectId,
      ref: "FeeItem",
      required: true
    },
    feeAmount: {
      type: Number,
      min: 0,
      required: true
    },
    discAmount: {
      type: Number,
      min: 0
    },
    discPercent: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeStructureCategory", schema);
