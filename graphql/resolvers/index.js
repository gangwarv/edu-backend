const { mergeResolvers } = require("../merge-helpers");

const SharedResolver = require("./shared");
const FeeResolvers = require("./fee");

module.exports = mergeResolvers([
  SharedResolver,
  FeeResolvers,
]);
