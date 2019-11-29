const FeeItem = require("../../../models/fee/fee-item");

const feeItems = args => {
  return FeeItem.find();
};

const feeItem = ({ id }) => {
  return FeeItem.findById(id);
};


const addFeeItem = async ({ id, name },req) => {
    req.passed('fee-item-create');
    let newDoc;
    if (id)
        newDoc = await FeeItem.findByIdAndUpdate(id, { name }, { new: true });
    else
        newDoc = await FeeItem.create({
            name
        });

    return newDoc;
  };
  
  const deleteFeeItem = async ({ id }, req) => {
    req.passed('fee-item-delete');

    const count = await FeeItem.countDocuments({ _id: id });

    if (count === 0) {
        throw new Error("FeeItem does not exists!")
    }
    return FeeItem.findByIdAndDelete(id);
}

module.exports = {
    feeItems,
    feeItem,
    addFeeItem,
    deleteFeeItem
}