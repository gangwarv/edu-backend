const AuthResolver = require("./auth");
const CategoryResolver = require("./category");
const DepartmentResolver = require("./department");
const CourseResolver = require("./course");
const SessionResolver = require("./session");
// modules
const FeeResolvers = require("./fee");

// var resolvers = {
//   ...AuthResolver,
//   ...CategoryResolver,
//   ...DepartmentResolver,
//   ...CourseResolver,
//   ...SessionResolver,

//   ...FeeResolver,
// };

// var o = {
//   Query: {},
//   Mutation: {},
// };
// function wrap(fn){
// return function(a,b,c){
//     // console.log(a,b,c)
//     return fn(b,c)
// }
// }
// Object.keys(resolvers).forEach((k) => {
//   if (k.startsWith("delete") || k.startsWith("add") || k.startsWith('modif') || k.startsWith("log"))
//     o.Mutation[k] = wrap(resolvers[k]);
//   else o.Query[k] =  wrap(resolvers[k]);
// });
// module.exports = o;

module.exports = [
  AuthResolver,
  CategoryResolver,
  DepartmentResolver,
  CourseResolver,
  SessionResolver,
  FeeResolvers,
].reduce(
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
