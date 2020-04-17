const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fsSession: {
      type: String,
      required: true
    },
    fsCategory: {
      type: String,
      required: true
    },
    course: {
      // null in case of non-academic fees
      type: mongoose.Types.ObjectId,
      required: function() {
        return this.feeType === 'academic' || this.feeType === 'registration';
      },
      ref: "Course"
    },
    year: {
      // null in case of non-academic fees
      type: String,
      required: function() {
        return this.feeType === 'academic';
      },
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
    feeType: {
      // academic: course specific, non-academic: common for all courses & year, 
      // registration: course registration fee before admission
      type: String,
      enum:['academic','non-academic','registration'],
      required: true
    },
    isOptional: {
      // whether fee is optional or mandatory to all associated students
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

schema.index({ fsSession: 1, fsCategory: 1 });

module.exports = mongoose.model("FeeStructure", schema);
