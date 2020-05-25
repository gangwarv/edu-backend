const { mergeSchemas } = require("../merge-helpers");

const SharedSchema = require("./shared");

const FeeSchema = require("./fee");

const schemas = mergeSchemas([
  SharedSchema,
  FeeSchema,
]);

module.exports = `
${schemas[0]}

type Query {
    ${schemas[1]}
}

type Mutation {
    ${schemas[2]}
}
`;
