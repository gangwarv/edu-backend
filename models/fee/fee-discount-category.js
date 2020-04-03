const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    feeItem: {
      type: mongoose.Types.ObjectId,
      ref: "FeeItem",
      required: true
    },
    discAmount: {
      type: Number,
      min: 0
    },
    discPercent: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeDiscountCategory", schema);
