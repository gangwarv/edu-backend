const Sequence = require("../models/shared/sequence");
const prefixIds = {
    feeItem:"FI",
    feeType:"FT",
    course:"C",
    courseCode:"P",
    department:"D",
    category:"CAT"
}
// collectionName: unique identifier for sequence,
// length: no of character in Id
module.exports.generateNext = async function (
  collectionName,
  length
) {
  let count = await Sequence.countDocuments({ _id: collectionName });

  if (count == 0) {
    await Sequence.create({ _id: collectionName, sequence_value: 0 });
  }

  // rollback last generatedId
  if (!length)
    return Sequence.findByIdAndUpdate(
      collectionName,
      { $inc: { sequence_value: -1 } }
    );

  return Sequence.findByIdAndUpdate(
    collectionName,
    { $inc: { sequence_value: 1 } },
    { new: true }
  ).then((doc) => {
    if (length) {
      let no = `0000000000${doc.sequence_value}`;
      return (prefixIds[collectionName]||'') + no.substr(no.length - length);
    }
    return doc.sequence_value;
  });
};
