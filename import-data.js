
const AcademicDepartment = require('./models/shared/academicdepartment');
const Course = require('./models/shared/course');

module.exports = function(){

.then(dep =>{
    return Course.insertMany([
        {
            name:'Btech in CS',
            type:'UG'

        }
    ])
})

}


function createDept(dept){
    AcademicDepartment.create({
        name: 'Engineering'
    })
}