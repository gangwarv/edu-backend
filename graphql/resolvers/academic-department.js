const { transformDocument } = require('../../helpers/transform');
const AcademicDepartment = require('../../models/shared/academicdepartment');
const Course = require('../../models/shared/course');

const addAcDept = ({ name }) => {
    return AcademicDepartment
        .create({
            name,
            isActive: true,
            courses: []
        })
        .then(_ => {
            return transformDocument(_);
        });
}

const toggleAcDept = async ({ id }, req) => {
    req.roles.passed('add-course');
    try {
        let dept = await AcademicDepartment.findById(id);
        dept.isActive = !dept.isActive;
        dept = await dept.save();

        const transformedDept = transformDocument(dept);
        if (!transformedDept.isActive)
            await Course.updateMany({ department: transformedDept._id }, { isActive: false });

        return transformedDept;
    }
    catch (err) {
        throw err;
    }
}

const acDepts = (args) => {
    const { isActive } = args;
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return AcademicDepartment.find(filter);
}
const updateAcDept = async ({ id, name, isActive }) => {
    try {
        let dept = await AcademicDepartment.findById(id)
        dept.name = name.trim();
        dept.isActive = isActive;

        dept = await dept.save();
        const transformedDept = transformDocument(dept);

        await Course.updateMany({ department: transformedDept._id }, { departmentName: transformedDept.name });

        return transformedDept;
    }
    catch (err) {
        throw err;
    }
}
// const insertMany = async ({ depts }) => {
//     try {
//         const dept = await AcademicDepartment.insertMany(depts);
//     }
//     catch (err) {
//         throw err;
//     }
// }
module.exports = {
    addAcDept,
    toggleAcDept,
    acDepts,
    updateAcDept
}