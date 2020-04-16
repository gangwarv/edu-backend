const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true
    },
    allTasks: [String],
    pendingTasks: [String],
    runningTasks: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("session", schema);
