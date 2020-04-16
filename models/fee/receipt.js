const mongoose = require("mongoose");

const payment = new mongoose.Schema({
  txnId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  referenceNo: {
    type: String,
    required: true,
    default: "OK"
  },
  txnDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const schema = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true
    },
    bill: {
      type: mongoose.Types.ObjectId,
      ref: "Bill",
      required: function() {
        return this.type === "student";
      }
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
    paidAmount: {
      type: Number,
      min: 0,
      required: true
    },
    payment,
    isDuplicate: Boolean
  },
  { timestamps: true }
);

schema.index({ session: -1, type: -1 });

module.exports = mongoose.model("Bill", schema);
