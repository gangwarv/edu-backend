const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // student-currentSession
    session: {
      type: String,
      required: true
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeStudent", schema);
