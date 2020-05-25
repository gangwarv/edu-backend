const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    tasks: [
      {
        task: { type: String, required: true },
        status: {
          type: String,
          enum: ["pending", "running", "completed"],
          default: "pending",
        },
        lastUpdated: Date
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("session", schema);
