const { mergeSchemas } = require("../../merge-helpers");

const AuthSchema = require("./auth");
const CategorySchema = require("./category");
const DeptSchema = require("./department");
const CourseSchema = require("./course");
const SessionSchema = require("./session");


module.exports = mergeSchemas([AuthSchema, CategorySchema, DeptSchema, CourseSchema, SessionSchema]);
