const FeeCategory = require("../../../models/fee/fee-category");
const FeeStructure = require("../../../models/fee/fee-structure");

// Fee Category
const feeCategories = (args, req) => {
  req.passed("fee-structure");
  console.log('id,name')
  return FeeCategory.find();
};

const addFeeCategory = ({ id, name }, req) => {
  req.passed("fee-structure");
console.log(id,name,'byid')
  return FeeCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true, upsert: true,setDefaultsOnInsert: true }
  );
};
// End Fee Category
// Fee Structure --start



module.exports = {
    feeCategories,
    addFeeCategory
}