const FeeCategory = require("../../../models/fee/fee-category");
const FeeStructure = require("../../../models/fee/fee-structure");
const Course  = require("../../../models/shared/course");

const User = require("../../../models/app-management/user");



// Fee Category
const feeCategories = (args, req) => {
  req.passed("fee-structure");
  return FeeCategory.find();
};

const addFeeCategory = ({ id, name }, req) => {
  req.passed("fee-structure");
  return FeeCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};
// End Fee Category
// Fee Structure --start
const feeStructures = async (args, req) => {
  req.passed("fee-structure");

  return FeeCategory.find();
};

// session, fsCategory, course, feeType,
// fsArray: [id?, session, fsCategory, course, feeType, oddEven, year, feeItem, feeAmount, isDeleted]
const addFeeStructure = async ({ fs }, req) => {
  req.passed("fee-structure");
  
  // const courses = await Course.find({ isActive: true },'name')
  // console.log(courses)

  // console.time('fetch')
  // const userss = await User.find({isActive:true, userName: /Vishal$/}).limit(2)
  // console.timeEnd('fetch')
  // console.log(userss[0])
  
  // console.time('fetch lean')
  const users = await User.find({isActive:true}).limit(5).lean()
  // console.timeEnd('fetch lean')
  // console.log(users == null)
  // console.log('final ',users[0].id,JSON.stringify(users,null,5))
  // const count = await User.find().lean()
  // console.log(count[0])

  return [{ id: "sd" }];
};

module.exports = {
  feeCategories,
  addFeeCategory,

  feeStructures,
  addFeeStructure,
};
