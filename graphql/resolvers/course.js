const { transformDocument } = require('../../helpers/transform')
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

    const transformedCourse = transformDocument(createdCourse);
    if (dept.courses.indexOf(transformedCourse._id) === -1) {
        dept.courses.push(transformedCourse._id);
        await dept.save();
    }

    return transformedCourse;
}
toggleCourse = async ({ id }) => {
    try {
        const course = await Course.findById(id)
        const dept = await AcademicDepartment.findById(course.department);

        if (!course.isActive && !dept.isActive) {
            throw new Error("Please activate department first before activating it's courses.")
        }

        course.isActive = !course.isActive;

        return course.save()
            .then(d => transformDocument(d));
    }
    catch (err) {
        throw err;
    }
}

const courses = ({ isActive }, req) => {
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Course.find(filter)
        .exec()
        .then(docs => docs.map(x => transformDocument(x)));
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