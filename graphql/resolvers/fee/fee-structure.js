const mongoose = require("mongoose");
const FeeCategory = require("../../../models/fee/fee-category");
const FeeStructure = require("../../../models/fee/fee-structure");
const Course = require("../../../models/shared/course");

// const User = require("../../../models/app-management/user");

// Fee Category
const feeCategories = (_, args, req) => {
  req.passed("fee-structure-view");
  return FeeCategory.find();
};

const addFeeCategory = (_, { id, name }, req) => {
  req.passed("fee-structure-crud");
  return FeeCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};
// End Fee Category
// Fee Structure --start
const courseFeeStructure = async (
  _,
  { fsSession, fsCategory, feeType },
  req
) => {
  req.passed("fee-structure-view");
  if (!feeType) feeType = "type-1";
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
              id: "$_id",
              feeItem: "$feeItem._id",
              year: "$year",
              feeItemName: "$feeItem.name",
              feeAmount: "$feeAmount",
              label: "$label",
              dueDate: "$dueDate",
            },
          },
        ],
        as: "feeDetails",
      },
    },
    {
      $project: {
        _id: false,
        id: "$_id",
        code: "$code",
        courseName: "$name",
        feeDetails: "$feeDetails",
      },
    },
    {
      $addFields: {
        // fsExists: {
        //   $cond: { if: { $eq: [{ $size: "$feeDetails" }, 0] }, then: false, else: true },
        // },
        fsSession,
        fsCategory,
      },
    },
  ]);
  console.log(groups[0]);
  return groups;
};

const feeStructure = async (_, args, req) => {
  req.passed("fee-structure-view");
  if (args.feeType === "type-2") {
    args.course = null;
    args.year = null;
  }
  Object.keys(args).forEach((k) => {
    if (!args[k]) delete args[k];
    // if (!args[k]) delete args[k];
  });
  console.log(args);
  let fs = await FeeStructure.find(args)
    .populate("course", "name")
    .populate("feeItem", "name")
    .sort({ course: 1 })
    .lean();

  fs = fs.map((f) => ({
    ...f,
    course: f.course && f.course._id,
    courseName: f.course && f.course.name,
    feeItem: f.feeItem._id,
    feeItemName: f.feeItem.name,
  }));
  //console.log(fs);
  return fs;
};

// fsArray: [id?, session, fsCategory, course, feeType, label, year, feeItem, feeAmount, isDeleted]
const addFeeStructure = async (_, { fs }, req) => {
  req.passed("fee-structure-crud");
  const docs = fs.map((d) => new FeeStructure(d));
  const errors = docs.map((x) => x.validateSync());

  if (errors.length && errors[0]) throw errors[0];

  const del = fs.filter((x) => x.isDeleted).map((e) => e.id);
  const ins = fs.filter((x) => !x.isDeleted);

  const result = await Promise.all(
    ins.map((fsi) => {
      console.log(fsi);
      return FeeStructure.findByIdAndUpdate(
        fsi.id || new mongoose.Types.ObjectId(),
        {
          ...fsi,
          fromDate: new Date(fsi.fromDate),
          dueDate: new Date(fsi.dueDate),
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    })
  );
  if (del) await FeeStructure.deleteMany({ _id: { $in: del } });

  return result;
};

module.exports = {
  Query: {
    feeCategories,
    courseFeeStructure,
    feeStructure,
  },
  Mutation: {
    addFeeCategory,
    addFeeStructure,
  },
};
