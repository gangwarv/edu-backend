const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true
    },
    session: {
      type: String,
      required: true
    },
    feeItem: {
      type: mongoose.Types.ObjectId,
      ref: "FeeItem",
      required: true
    },
    discAmount: {
      type: Number,
      min: 0,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
      default: "pending"
    },
    reqNote: {
      type: String,
      required: true
    },
    resNote: {
      type: String,
      required: function() {
        return this.status != "pending";
      }
    }
  },
  { timestamps: true }
);

// schema.index({ session: 1 });
// schema.index({ status: 1 });

module.exports = mongoose.model("FeeDiscount", schema);
