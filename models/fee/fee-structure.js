const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fsSession: {
      type: String,
      required: true,
    },
    fsCategory: {
      type: String,
      required: true,
    },
    course: {
      // null in case of non-academic fees
      type: String,
      required: function () {
        return this.feeType === "academic" || this.feeType === "other";
      },
      ref: "Course",
    },
    label: {
      // semester wise indication
      type: String,
    },
    year: {
      // null in case of non-academic fees
      type: String,
      required: function () {
        return this.feeType === "academic";
      },
    },
    feeItem: {
      type: String,
      ref: "FeeItem",
      required: true,
    },
    feeAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    feeType: {
      // academic: course specific,
      // non-academic: common for all courses, eg; hostel-mess, transport etc.
      // other: registration/admission fee before admission, recipient is not a student yet
      type: String,
      enum: ["academic", "other", "non-academic"],
      required: true,
    },
    isOptional: {
      // whether fee is optional or mandatory to all associated students
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

schema.index({ fsSession: 1, fsCategory: 1 });

module.exports = mongoose.model("FeeStructure", schema);
