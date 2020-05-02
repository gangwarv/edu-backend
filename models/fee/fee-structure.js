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
      type: String,
      required: function() {
        return this.feeType === 'academic' || this.feeType === 'onetime';
      },
      ref: "Course"
    },
    label: String, // semester wise indication
    year: {
      // null in case of non-academic fees 
      type: String,
      required: function() {
        return this.feeType === 'academic';
      },
    },
    feeItem: {
      type: String,
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
      // academic: course specific, 
      // non-academic: common for all courses & year, 
      // onetime: course registration/admission fee before admission, recipient is not a student yet
      type: String,
      enum:['academic','onetime','non-academic'],
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
