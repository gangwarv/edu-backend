const mongoose = require("mongoose");
const { mobile, address } = require("../shared/shared-schema");

// duplicate columns - category

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    session: {
      type: String,
      required: true,
    },
    enrollmentNo: String,
    rollNo: String,
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    mobile: mobile,
    email: {
      type: String,
      lowercase: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    lateralEntry: {
      type: Boolean,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    paddress: address,
    caddress: address,
    nationality: {
      type: String,
      enum: ["INDIAN", "NRI"],
      required: true,
      default: "INDIAN",
    },
  },
  { timestamps: true }
);
schema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
schema.virtual("city").get(function () {
  return this.paddress.city;
});
schema.virtual("cityName").get(function () {
  return this.paddress.city.name;
});
schema.virtual("state").get(function () {
  return this.paddress.state;
});
schema.virtual("stateName").get(function () {
  return this.paddress.city.stateName;
});

module.exports = mongoose.model("Student", schema);
