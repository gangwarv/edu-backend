const FeeItem = require("../../../models/fee/fee-item");
const FeeType = require("../../../models/fee/fee-type");
const { generateNext } = require("../../../helpers/sequence");

const feeItems = (args) => {
  return FeeItem.find();
};

const feeItem = ({ id }) => {
  return FeeItem.findById(id);
};

const addFeeItem = async ({ id, name, type, isActive }, req) => {
  req.passed("fee-item-crud");
  let newDoc;
  let typeName = (await FeeType.findById(type)).name;
  if (id)
    newDoc = await FeeItem.findByIdAndUpdate(
      id,
      { name, type, isActive, typeName },
      { new: true }
    );
  else {
    id = await generateNext("feeitem", 3, "FI");
    newDoc = await FeeItem.create({
      _id: id,
      name,
      type,
      typeName,
      isActive,
    }).catch(async err=>{
      await generateNext("feeitem");
      return err;
    });
  }

  return newDoc;
};

const deleteFeeItem = async ({ id }, req) => {
  req.passed("fee-item-crud");

  const count = await FeeItem.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("FeeItem does not exists!");
  }
  return FeeItem.findByIdAndDelete(id);
};

/// FeeType

const feeTypes = (args) => {
  return FeeItem.find();
};

const addFeeType = async ({ id, name }, req) => {
  req.passed("fee-item-create");
  let newDoc;
  if (id) newDoc = await FeeType.findByIdAndUpdate(id, { name }, { new: true });
  else {
    id = await generateNext("feetype", 2, "FT");

    newDoc = await FeeType.create({
      _id: id,
      name,
    }).catch(async err=>{
      await generateNext("feetype");
      return err;
    });
  }
  return newDoc;
};

const deleteFeeType = async ({ id }, req) => {
  req.passed("fee-item-delete");

  const count = await FeeType.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("Fee Type does not exists!");
  }
  return FeeType.findByIdAndDelete(id);
};

module.exports = {
  feeItems,
  feeItem,
  addFeeItem,
  deleteFeeItem,

  feeTypes,
  addFeeType,
  deleteFeeType,
};
