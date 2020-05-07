const FeeItem = require("../../../models/fee/fee-item");
const FeeGroup = require("../../../models/fee/fee-group");
const { generateNext } = require("../../../helpers/sequence");

const feeItems = async (args) => {
  return FeeItem.find();
};

const feeItem = ({ id }) => {
  return FeeItem.findById(id);
};

const addFeeItem = async ({ id, name, group, isActive }, req) => {
  req.passed("fee-structure-crud");

  const feeGroup = await FeeGroup.findById(group);
  const groupName = feeGroup.name;

  if (!id) id = await generateNext("feeItem", 3);

  return await FeeItem.findByIdAndUpdate(
    id,
    {
      name,
      group,
      groupName,
      isActive,
    },
    { new: true, upsert: true }
  ).lean();
};

const deleteFeeItem = async ({ id }, req) => {
  req.passed("fee-structure-crud");

  const count = await FeeItem.countDocuments({ _id: id });

  if (count === 0) {
    throw new Error("Fee Item does not exists!");
  }
  return FeeItem.findByIdAndDelete(id);
};

/// FeeGroup

const feeGroups = () => {
  return FeeGroup.find();
};

const addFeeGroup = async ({ id, name }, req) => {
  req.passed("fee-structure-crud");
  let newDoc;
  if (id) {
    newDoc = await FeeGroup.findByIdAndUpdate(id, { name }, { new: true });
    // update relation
    await FeeItem.updateMany({ group: id }, { groupName: name });
  } else {
    id = await generateNext("feeGroup", 2);

    newDoc = await FeeGroup.create({
      _id: id,
      name,
    }).catch(async (err) => {
      await generateNext("feeGroup");
      return err;
    });
  }
  return newDoc;
};

const deleteFeeGroup = async ({ id }, req) => {
  req.passed("fee-structure-crud");

  let count = await FeeGroup.countDocuments({ _id: id });

  if (count === 0) throw new Error("Fee Type does not exists!");
  else count = await FeeItem.countDocuments({ group: id });

  if (count > 0)
    throw new Error("Kindly detach all its associated entities first.");

  return FeeGroup.findByIdAndDelete(id);
};

module.exports = {
  feeItems,
  feeItem,
  addFeeItem,
  deleteFeeItem,

  feeGroups,
  addFeeGroup,
  deleteFeeGroup,
};
