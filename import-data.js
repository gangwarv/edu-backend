
const AcademicDepartment = require('./models/shared/academicdepartment');
const Course = require('./models/shared/course');

module.exports = function(){


}


function createDept(dept){
    AcademicDepartment.create({
        name: 'Engineering'
    })
}