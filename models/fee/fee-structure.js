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
        return this.isAcademic;
      },
      ref: "Course"
    },
    year: {
      // null in case of non-academic fees
      type: String,
      required: function() {
        return this.isAcademic;
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
    isAcademic: {
      // whether fee is course specific, true if yes => course & year will be mandatory
      type: Boolean,
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
