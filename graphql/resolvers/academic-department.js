const { transformDocument } = require('../../helpers/transform')
const AcademicDepartment = require('../../models/shared/academicdepartment');

const createAcademicDepartment = ({ name }) => {
    return AcademicDepartment.create({
        name,
        isActive: true,
        courses: []
    })
        .then(_ => {
            return transformDocument(_);
        })
}
const toggleAcademicDepartment = async ({ _id }) => {
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

const getAcademicDepartments = ({ isActive }) => {
    const filter = {};
    if (isActive !== undefined && isActive !== null) {
        filter['isActive'] = isActive
    }
    return AcademicDepartment.find(filter);
}

module.exports =
    {
        createAcademicDepartment,
        toggleAcademicDepartment,
        getAcademicDepartments
    }