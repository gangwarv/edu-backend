
const AcademicDepartment = require('./models/shared/academicdepartment');
const Course = require('./models/shared/course');

module.exports = function(){
AcademicDepartment.create({
    name: 'Engineering'
})
.then(dep =>{
    return Course.insertMany([
        {
            name:'Btech in CS',
            type:'UG'

        }
    ])
})

}