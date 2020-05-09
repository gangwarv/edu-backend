const { mergeSchemas } = require("../../merge-helpers");

const FeeItemSchema = require("./fee-item");
const FeeStructureSchema = require("./fee-structure");

module.exports = mergeSchemas([FeeItemSchema, FeeStructureSchema]);
