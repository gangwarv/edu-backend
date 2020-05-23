const mongoose = require("mongoose");
const FeeCategory = require("./models/fee/fee-category");
const FeeStructure = require("./models/fee/fee-structure");
const Course = require("./models/shared/course");

module.exports = async function (req, res) {
  const fsSession = "2019-20",
    fsCategory = "STD",
    feeType = "type-1";
  const groups = await FeeStructure.aggregate([
    { $match: { fsSession, fsCategory, feeType } },
    {
      $group: {
        _id: { course: "$course", year: "$year" },
        sum: { $sum: "$feeAmount" },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id.course",
        foreignField: "_id",
        as: "courses",
      },
    },
    {
        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt:[ "$courses", 0 ] }, "$$ROOT" ] } }
     },
    {
      $project: {
        courseName: "$name",//{$arrayElemAt: [ "$courses", 0 ] },
        _id: "$_id.course",
        year: "$_id.year",
        totalFee: "$sum",
      },
    },
    {
      $sort: { courseName: 1, year: 1 },
    },
  ]);
  res.send(JSON.stringify(groups, null, 5));
};
