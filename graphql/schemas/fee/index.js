const FeeItemSchema = require("./fee-item");
const FeeStructureSchema = require("./fee-structure");

module.exports = [FeeItemSchema, FeeStructureSchema].reduce(
  (acc, schema) => {
    return acc.map((ac, i) => (ac += "\n" + schema[i]));
  },
  ["", "", ""]
);
