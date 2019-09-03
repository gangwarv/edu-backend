const authResolver = require('./auth');
const categoryResolver = require('./category');
const academicDepartmentResolver = require('./academic-department');
const courseResolver = require('./course');
   
module.exports = {
    ...authResolver,
    ...categoryResolver,
    ...academicDepartmentResolver,
    ...courseResolver
}