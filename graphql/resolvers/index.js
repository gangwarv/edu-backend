const AuthResolver = require('./auth');
const CategoryResolver = require('./category');
const AcademicDepartmentResolver = require('./academic-department');
const CourseResolver = require('./course');
const FeeResolver = require('./fee-resolver');
   
module.exports = {
    ...AuthResolver,
    ...CategoryResolver,
    ...AcademicDepartmentResolver,
    ...CourseResolver,

    ...FeeResolver
}