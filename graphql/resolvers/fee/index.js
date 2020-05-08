const FeeItemResolver = require("./fee-item");
const FeeStructesolver = require("./fee-structure");

module.exports = [FeeItemResolver, FeeStructesolver].reduce(
  (acc, item) => {
    acc.Query = { ...acc.Query, ...item.Query };
    acc.Mutation = { ...acc.Mutation, ...item.Mutation };
    return acc;
  },
  {
    Query: {},
    Mutation: {},
  }
);
