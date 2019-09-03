module.exports = {
    acDeptTypes: `
    type AcademicDepartment {
        _id: String
        name: String!
        isActive: Boolean!
        courses: [String!]!
    }
    `,
    acDeptQueries: `
        getAcademicDepartments(isActive: Boolean): [AcademicDepartment!]!
    `,
    acDeptMutations: `
        createAcademicDepartment(name: String!): AcademicDepartment!
        toggleAcademicDepartment(_id: String!): AcademicDepartment!
    `
}