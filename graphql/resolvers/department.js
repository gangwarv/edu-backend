const Department = require('../../models/shared/department');
const Course = require('../../models/shared/course');

const addDepartment = async ({ dept: { id, name, isActive } }, req) => {
    req.passed('course-create');
    let newDept;
    if (id)
        newDept = await Department.findByIdAndUpdate(id, { name, isActive }, { new: true });
    else
        newDept = await Department.create({
            name,
            isActive: true,
            courses: []
        });

    await Course.updateMany({ department: newDept.id }, { departmentName: newDept.name });

    return newDept;
}

const toggleDepartment = async ({ id }, req) => {
    req.roles.passed('course-create');
    try {
        let dept = await Department.findById(id);
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
const deleteDepartment = async ({ id }, req) => {
    req.passed('course-delete');

    const courseCount = await Course.countDocuments({ department: id });

    if (courseCount > 0) {
        throw new Error("Kindly detach all its associated entities first.")
    }
    const deptCount = await Department.countDocuments({ _id: id });

    if (deptCount === 0) {
        throw new Error("Academic Department does not exists!")
    }
    return Department.findByIdAndDelete(id);
}

const departments = (args) => {
    const { isActive } = args;
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return Department.find(filter);
}
const department = ({ id }) => {
    return Department.findById(id);
}

module.exports = {
    departments,
    department,
    addDepartment,
    toggleDepartment,
    deleteDepartment
}