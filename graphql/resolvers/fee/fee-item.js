const FeeItem = require("../../../models/fee/fee-item");
const FeeType = require("../../../models/fee/fee-type");
const { generateNext } = require("../../../helpers/sequence");

const feeItems = async (args) => {
  return FeeItem.find();
};

const feeItem = ({ id }) => {
  return FeeItem.findById(id);
};

const addFeeItem = async ({ id, name, type, isActive }, req) => {
  req.passed("fee-structure-crud");
  let newDoc;
  const feetype = await FeeType.findById(type);
  
  let typeName = feetype.name;
  if (id)
    newDoc = await FeeItem.findByIdAndUpdate(
      id,
      { name, type, isActive, typeName },
      { new: true }
    );
  else {

    id = await generateNext("feeItem", 3);
    newDoc = await FeeItem.create({
      _id: id,
      name,
      type,
      typeName,
      isActive,
    }).catch(async (err) => {
      await generateNext("feeItem");
      return err;
    });
  }

  return newDoc;
};

const deleteFeeItem = async ({ id }, req) => {
  req.passed("fee-structure-crud");

  const count = await FeeItem.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("FeeItem does not exists!");
  }
  return FeeItem.findByIdAndDelete(id);
};

/// FeeType

const feeTypes = () => {
  return FeeType.find();
};

const addFeeType = async ({ id, name }, req) => {
  req.passed("fee-structure-crud");
  let newDoc;
  if (id) {
    newDoc = await FeeType.findByIdAndUpdate(id, { name }, { new: true });
    // update relation
    await FeeItem.updateMany({ type: id }, { typeName: name });
  } else {
    id = await generateNext("feeType", 2);

    newDoc = await FeeType.create({
      _id: id,
      name,
    }).catch(async (err) => {
      await generateNext("feeType");
      return err;
    });
  }
  return newDoc;
};

const deleteFeeType = async ({ id }, req) => {
  req.passed("fee-structure-crud");

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
