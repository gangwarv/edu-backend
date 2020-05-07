const { buildSchema } = require("graphql");
const AuthSchema = require("./auth");
const CategorySchema = require("./category");
const AcDeptSchema = require("./department");
const CourseSchema = require("./course");

const SessionSchema = require("./session");

const FeeSchema = require("./fee");

const schemas = [
  AuthSchema,
  CategorySchema,
  AcDeptSchema,
  CourseSchema,
  SessionSchema,
  FeeSchema,
].reduce(
  (acc, schema) => {
    return acc.map((ac, i) => (ac += "\n" + schema[i]));
  },
  ["", "", ""]
);

module.exports = buildSchema(`
scalar ISODate
${schemas[0]}

type Query {
    ${schemas[1]}
}

type Mutation {
    ${schemas[2]}
}
`);
