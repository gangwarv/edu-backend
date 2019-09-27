const Course = require('../../models/shared/course');
const AcademicDepartment = require('../../models/shared/academicdepartment');

addCourse = async ({ course }) => {
    const dept = await AcademicDepartment.findById(course.department);
    const newCourse = {
        ...course,
        departmentName: dept._doc.name
    }
    var createdCourse = null;

    if (newCourse.id) {
        const id = newCourse.id;
        createdCourse = await Course.findByIdAndUpdate({ _id: id }, newCourse, { new: true });
    }
    else {
        createdCourse = await Course.create(newCourse);
    }

    if (dept.courses.indexOf(createdCourse.id) === -1) {
        dept.courses.push(createdCourse.id);
        await dept.save();
    }

    return createdCourse;
}
toggleCourse = async ({ id }) => {
    try {
        const course = await Course.findById(id)
        const dept = await AcademicDepartment.findById(course.department);

        if (!course.isActive && !dept.isActive) {
            throw new Error("Please activate department first before activating it's courses.")
        }

        course.isActive = !course.isActive;

        return course.save();
    }
    catch (err) {
        throw err;
    }
}

const courses = async ({ isActive, department }, req) => {
    const filter = {};
    console.log('dept', department)
    if (isActive !== undefined)
        filter['isActive'] = isActive
    if (department) {
        filter['department'] = department;
    }
    console.log(filter)
    return Course.find(filter);
}

const course = ({ id }, req) => {
    return Course.findById(id);
}

module.exports =
    {
        addCourse,
        toggleCourse,
        courses,
        course
    }