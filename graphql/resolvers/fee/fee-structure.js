const mongoose = require("mongoose");
const FeeCategory = require("../../../models/fee/fee-category");
const FeeStructure = require("../../../models/fee/fee-structure");
const Course = require("../../../models/shared/course");

// const User = require("../../../models/app-management/user");

// Fee Category
const feeCategories = (_, args, req) => {
  req.passed("fee-structure-crud");
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
  req.passed("fee-structure-crud");
  const courses = await Course.find({ isActive: true }, "name").lean();

  const aggr = await FeeStructure.aggregate([
    { $match: { fsSession, fsCategory } },
    {
      $group: {
        _id: { course: "$course", feeType: "$feeType" },
        count: { $sum: 1 },
        sum: { $sum: "$feeAmount" },
      },
    },
    {
      $project: {
        course: "$_id.course",
        feeType: "$_id.feeType",
        count: "$count",
        sum: "$sum",
      },
    },
  ]);
  // const aggrFlat=aggr.map(x=>({_i}))
  return courses.map((x) => ({
    course: x.id,
    courseName: x.name,
    fsSession,
    fsCategory,
    fsSummary: aggr.filter((s) => s.course === x.id),
    academic: aggr.find((a) => a.course == x.id && a.feeType == "academic") || {
      count: 0,
      sum: 0,
    },
    nonAcademic: aggr.find(
      (a) => a.course == x.id && a.feeType == "non-academic"
    ) || { count: 0, sum: 0 },
    other: aggr.find((a) => a.course == x.id && a.feeType == "other") || {
      count: 0,
      sum: 0,
    },
  }));
};

const feeStructure = async (_, filterArgs, req) => {
  req.passed("fee-structure-crud");
  // if (filterArgs.feeType === "academic")
  //   filterArgs.feeType = { $in: ["academic", "other"] };
  return FeeStructure.find(filterArgs).lean();
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
