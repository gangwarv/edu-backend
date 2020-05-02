const FeeCategory = require("../../../models/fee/fee-category");
const FeeStructure = require("../../../models/fee/fee-structure");

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
// const feeStructures = (args, req) => {
//   req.passed("fee-structure");
//   return FeeCategory.find();
// };

// const addFeeStructure = (args, req) => {
//   req.passed("fee-structure");
//   return FeeCategory.findByIdAndUpdate(
//     id,
//     { name },
//     { new: true, upsert: true }
//   );
// };


module.exports = {
    feeCategories,
    addFeeCategory
}