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
const feeStructures = async (_, args, req) => {
  req.passed("fee-structure-crud");
  const courses = await Course.find({ isActive: true }).lean();
  // const res = await Course.aggregate([
  //   {
  //     $group: { _id: { dept: "$departmentName" }, count: { $sum: 1 } },
  //   },
  // ]);
  courses.forEach((c) => {
    c.course = c.id;
    c.courseName = c.name;
    c.fsCategory = "STD";
    c.fsSession = "2019-20";
  });
  return courses;
};

const feeStructure = async (_, filterArgs, req) => {
  req.passed("fee-structure-crud");

  return FeeStructure.find(filterArgs).lean();
};
// session, fsCategory, course, feeType,
// fsArray: [id?, session, fsCategory, course, feeType, oddEven, year, feeItem, feeAmount, isDeleted]
const addFeeStructure = async (_, { fs }, req) => {
  req.passed("fee-structure-crud");

  const del = fs.filter((x) => x.isDeleted).map((e) => e.id);
  const ins = fs.filter((x) => !x.isDeleted);

  const result = await Promise.all(
    ins.map((fsi) => {
      return FeeStructure.findByIdAndUpdate(
        fsi.id || new mongoose.Types.ObjectId(),
        fsi,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          run,
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
  }
};
