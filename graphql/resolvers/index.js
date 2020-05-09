const { mergeResolvers } = require("../merge-helpers");

const AuthResolver = require("./auth");
const CategoryResolver = require("./category");
const DepartmentResolver = require("./department");
const CourseResolver = require("./course");
const SessionResolver = require("./session");
// modules
const FeeResolvers = require("./fee");

module.exports = mergeResolvers([
  AuthResolver,
  CategoryResolver,
  DepartmentResolver,
  CourseResolver,
  SessionResolver,
  FeeResolvers,
]);
