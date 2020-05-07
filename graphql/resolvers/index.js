const AuthResolver = require('./auth');
const CategoryResolver = require('./category');
const DepartmentResolver = require('./department');
const CourseResolver = require('./course');
const SessionResolver = require('./session');

const FeeResolver = require('./fee');
   
module.exports = {
    ...AuthResolver,
    ...CategoryResolver,
    ...DepartmentResolver,
    ...CourseResolver,
    ...SessionResolver,

    ...FeeResolver
}