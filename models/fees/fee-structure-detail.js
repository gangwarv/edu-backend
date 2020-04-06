const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // Admission-Session
    fsCategory: {
      type: String,
      required: true
    },
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
    // maxDueDate: {
    //   type: Date,
    //   required: true
    // }
  },
  { timestamps: true }
);

//schema.index({ fsCategory: 1, fsSession: 1 }, { unique: true });

module.exports = mongoose.model("FeeStructure", schema);
