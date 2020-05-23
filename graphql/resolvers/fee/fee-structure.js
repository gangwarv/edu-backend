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
const feeStructures = async (_, { fsSession, fsCategory }, req) => {
  req.passed("fee-structure-view");
  // await FeeStructure.updateMany(
  //   { feeType: "other" },
  //   { $set: { feeType: "type-2" } }
  // );
  const courses = await Course.find({ isActive: true }, "name").lean();

  const aggr = await FeeStructure.aggregate([
    { $match: { fsSession, fsCategory, feeType: 'type-1', year: { $ne: "0" } } },
    {
      $group: {
        _id: { course: "$course" },
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
        course: "$name", //{$arrayElemAt: [ "$courses", 0 ] },
        id: "$_id.course",
        totalFee: "$sum"
      },
    },
    {
      $sort: { course: 1},
    },
  ]);
  // const aggrFlat=aggr.map(x=>({_i}))
  return courses.map((x) => ({
    course: x.id,
    courseName: x.name,
    fsSession,
    fsCategory,
  }));
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
    feeStructures,
    feeStructure,
  },
  Mutation: {
    addFeeCategory,
    addFeeStructure,
  },
};
