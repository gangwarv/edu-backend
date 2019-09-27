const AcademicDepartment = require('../../models/shared/academicdepartment');
const Course = require('../../models/shared/course');

const addAcDept = async ({ dept: { id, name, isActive } }) => {
    let newDept;
    if (id)
        newDept = await AcademicDepartment.findByIdAndUpdate(id, { name, isActive }, { new: true });
    else
        newDept = await AcademicDepartment.create({
            name,
            isActive: true,
            courses: []
        });

    await Course.updateMany({ department: newDept.id }, { departmentName: newDept.name });

    return newDept;
}

const toggleAcDept = async ({ id }, req) => {
    req.roles.passed('add-course');
    try {
        let dept = await AcademicDepartment.findById(id);
        dept.isActive = !dept.isActive;
        dept = await dept.save();

        if (!dept.isActive)
            await Course.updateMany({ department: dept.id }, { isActive: false });

        return dept;
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
    acDepts
}