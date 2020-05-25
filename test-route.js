const mongoose = require("mongoose");
const FeeCategory = require("./models/fee/fee-category");
const FeeStructure = require("./models/fee/fee-structure");
const Course = require("./models/shared/course");

var express = require("express");
var router = express.Router();

router.get("/", async function (req, res) {
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
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$courses", 0] }, "$$ROOT"],
        },
      },
    },
    {
      $project: {
        courseName: "$name", //{$arrayElemAt: [ "$courses", 0 ] },
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
});

router.get("/1", async function (req, res) {
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
    //   {
    //     $replaceRoot: {
    //       newRoot: {
    //         $mergeObjects: [{ $arrayElemAt: ["$courses", 0] }, "$$ROOT"],
    //       },
    //     },
    //   },
    { $unwind: "$courses" },
    //   {
    //     $project: {
    //       courseName: "$name", //{$arrayElemAt: [ "$courses", 0 ] },
    //       _id: "$_id.course",
    //       year: "$_id.year",
    //       totalFee: "$sum",
    //     },
    //   },
    //   {
    //     $sort: { courseName: 1, year: 1 },
    //   },
  ]);
  res.send(JSON.stringify(groups, null, 5));
});

router.get("/2", async function (req, res) {
  const fsSession = "2019-20",
    fsCategory = "STD",
    feeType = "type-1";
  const groups = await Course.aggregate([
    { $match: { isActive: true } },
    {
      $lookup: {
        from: "feestructures",
        let: { courseId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$course", "$$courseId"] },
                  { $eq: ["$fsSession", fsSession] },
                  { $eq: ["$fsCategory", fsCategory] },
                  { $eq: ["$feeType", feeType] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "feeitems",
              let: { itemId: "$feeItem" },
              pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$itemId"] } } }],
              as: "feeItem",
            },
          },
          { $unwind: "$feeItem" },
          {
            $project: {
              feeItem: "$feeItem._id",
              year: "$year",
              feeItemName: "$feeItem.name",
              feeAmount: "$feeAmounts",
              dueDate: "$dueDate",
            },
          },
        ],
        as: "feeDetails",
      },
    },
    {
      $project: {
        id: "$_id",
        code: "$code",
        courseName: "$name",
        feeDetails: "$feeDetails",
        _id: 0,
      },
    },
    {
      $addFields: {
        size: { $size: "$feeDetails" },
        fsSession,
        fsCategory,
      },
    },
  ]);
  res.send(JSON.stringify(groups, null, 5));
});
module.exports = router;
