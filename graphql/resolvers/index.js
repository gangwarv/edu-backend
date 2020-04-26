const AuthResolver = require('./auth');
const CategoryResolver = require('./category');
const DepartmentResolver = require('./department');
const CourseResolver = require('./course');
const FeeResolver = require('./fee-resolver');
   
module.exports = {
    ...AuthResolver,
    ...CategoryResolver,
    ...DepartmentResolver,
    ...CourseResolver,

    ...FeeResolver
}