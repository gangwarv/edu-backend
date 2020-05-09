const { mergeResolvers } = require("../../merge-helpers");

const FeeItemResolver = require("./fee-item");
const FeeStructesolver = require("./fee-structure");

module.exports = mergeResolvers([FeeItemResolver, FeeStructesolver]);
