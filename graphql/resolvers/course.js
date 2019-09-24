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
    if (newCourse._id) {
        const id = newCourse._id;
        delete newCourse._id;
        createdCourse = await Course.findByIdAndUpdate(id, newCourse);
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

const courses = ({ isActive }, req) => {
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Course.find(filter)
        .exec()
        .then(docs => docs.map(x => transformDocument(x)));
}

const course = ({ _id }, req) => {
    return Course.findById(_id);
}

module.exports =
    {
        addCourse,
        toggleCourse,
        courses,
        course
    }