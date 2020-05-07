const Sequence = require("../models/shared/sequence");
const prefixIds = {
  feeItem: "FI",
  feeGroup: "FG",
  course: "C",
  courseCode: "P",
  department: "D",
  category: "CAT",
};
// const lastGeneratedIds = {};
// collectionName: unique identifier for sequence,
// length: no of character in Id
module.exports.generateNext = async function (collectionName, length) {
  let count = await Sequence.countDocuments({ _id: collectionName });

  if (count == 0) {
    await Sequence.create({ _id: collectionName, sequence_value: 0 });
  }

  // rollback last generatedId
  if (!length)
    return Sequence.findByIdAndUpdate(collectionName, {
      $inc: { sequence_value: -1 },
    }).lean();
  // otherwise give
  return Sequence.findByIdAndUpdate(
    collectionName,
    { $inc: { sequence_value: 1 } },
    { new: true }
  )
    .lean()
    .then((doc) => {
      if (length) {
        let no = `0000000000${doc.sequence_value}`;
        return (
          (prefixIds[collectionName] || "") + no.substr(no.length - length)
        );
      }
      return doc.sequence_value;
    });
};
