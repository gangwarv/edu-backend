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
      // null in case of type-1 fees
      type: String,
      required: function () {
        return this.feeType === "type-1";
      },
      ref: "Course",
    },
    label: {
      // semester wise indication
      type: String,
    },
    year: {
      // null in case of type-1 fees
      type: String,
      required: function () {
        return this.feeType === "type-1";
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
      // type-1: course specific, registration/admission fee before admission
      // type-2: common for all courses, eg; hostel-mess, transport etc.
      type: String,
      enum: ["type-1", "type-2"],
      required: true,
    },
    isOptional: {
      // whether fee is optional or mandatory to all associated students
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

schema.index({ fsSession: 1, fsCategory: 1 });

module.exports = mongoose.model("FeeStructure", schema);
