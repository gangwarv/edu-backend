const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["student", "registration"],
      required: true
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: function() {
        return this.type === "student";
      }
    },
    registration: {
      type: mongoose.Types.ObjectId,
      ref: "Registration",
      required: function() {
        return this.type === "registration";
      }
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
      min: 0,
      required: true,
      default: 0
    },
    paybleAmount: {
      type: Number,
      min: 0,
      required: true
    },
    paidAmount: {
      type: Number,
      min: 0,
      required: true,
      default: 0
    },
    outstandingAmount: {
      type: Number,
      min: 0,
      required: true,
      default: 0
    },
    dueDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

schema.index({ session: -1, type: -1 });

module.exports = mongoose.model("Bill", schema);
