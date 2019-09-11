const { transformDocument } = require('../../helpers/transform')
const AcademicDepartment = require('../../models/shared/academicdepartment');

const addAcDept = ({ name }) => {
    return AcademicDepartment.create({
        name,
        isActive: true,
        courses: []
    })
        .then(_ => {
            return transformDocument(_);
        })
}
const toggleAcDept = async ({ _id }) => {
    try {
        const dept = await AcademicDepartment.findById(_id)
        dept.isActive = !dept.isActive;

        return dept.save()
            .then(d => transformDocument(d));
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
const updateAcDept = async ({ _id, name, isActive }) => {
    try {
        const dept = await AcademicDepartment.findById(_id)
        dept.name = name.trim();
        dept.isActive = isActive;

        return dept.save()
            .then(d => transformDocument(d));
    }
    catch (err) {
        throw err;
    }
}
const insertMany = async ({ depts }) => {
    try {
        const dept = await AcademicDepartment.insertMany(depts);
    }
    catch (err) {
        throw err;
    }
}
module.exports =
    {
        addAcDept,
        toggleAcDept,
        acDepts,
        updateAcDept
    }