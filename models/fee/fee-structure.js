const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // Admission-Session
    fsSession: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true
    },
    year: {
      type: String,
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
    dueDate: {
      type: Date,
      required: true
    },
    maxDueDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeStructure", schema);
