const { mergeSchemas } = require("../merge-helpers");

const AuthSchema = require("./auth");
const CategorySchema = require("./category");
const AcDeptSchema = require("./department");
const CourseSchema = require("./course");

const SessionSchema = require("./session");

const FeeSchema = require("./fee");

const schemas = mergeSchemas([
  AuthSchema,
  CategorySchema,
  AcDeptSchema,
  CourseSchema,
  SessionSchema,
  FeeSchema,
]);

module.exports = `
scalar ISODate
${schemas[0]}

type Query {
    ${schemas[1]}
}

type Mutation {
    ${schemas[2]}
}
`;
