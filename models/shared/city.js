const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    state: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "State"
    },
    stateName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("City", schema);
