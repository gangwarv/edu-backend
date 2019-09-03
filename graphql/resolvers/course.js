const { transformDocument } = require('../../helpers/transform')
const Course = require('../../models/shared/course');
const AcademicDepartment = require('../../models/shared/academicdepartment');

addCourse = async ({ course }) => {
    const dept = await AcademicDepartment.findById(course.department).exec();
    let cid = null;
    return Course.create({
        ...course,
        isActive: true,
        departmentName: dept._doc.name,
        department: dept.id
    })
        .then(_ => {
            cid= transformDocument(_);
            dept.courses.push(_.id)
            return  dept.save();
        })
        .then(d=>{
            return cid;
        })
}
toggleCourse = async ({ _id }) => {
    try {
        const course = await Course.findById(_id)
        course.isActive = !course.isActive;

        return course.save()
            .then(d => transformDocument(d));
    }
    catch (err) {
        throw err;
    }
}

const courses = ({ isActive }) => {
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Course.find(filter);
}

module.exports =
    {
        addCourse,
        toggleCourse,
        courses
    }