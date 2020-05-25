module.exports.mergeResolvers = function (arr) {
  return arr.reduce(
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
};

module.exports.mergeSchemas = function (arr) {
    return arr.reduce(
        (acc, schema) => {
          return acc.map((ac, i) => (ac += "\n" + schema[i]));
        },
        ["", "", ""]
      );
      
  };
  