const AcademicDepartment = require('../../models/shared/academicdepartment');
const Course = require('../../models/shared/course');

const addAcDept = async ({ dept: { id, name, isActive } }, req) => {
    req.passed('course-create');
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
    req.roles.passed('course-create');
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
const deleteAcDept = async ({ id }, req) => {
    req.passed('course-delete');

    const courseCount = await Course.countDocuments({ department: id });

    if (courseCount > 0) {
        throw new Error("Kindly detach all its associated entities first.")
    }
    const deptCount = await AcademicDepartment.countDocuments({ _id: id });

    if (deptCount === 0) {
        throw new Error("Academic Department does not exists!")
    }
    return AcademicDepartment.findByIdAndDelete(id);
}

const acDepts = (args) => {
    const { isActive } = args;
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return AcademicDepartment.find(filter);
}
const acDept = ({ id }) => {
    return AcademicDepartment.findById(id);
}

module.exports = {
    acDepts,
    acDept,
    addAcDept,
    toggleAcDept,
    deleteAcDept
}