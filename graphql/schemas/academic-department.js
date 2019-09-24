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
    acDepts(isActive: Boolean): [AcademicDepartment!]!
    `,
    acDeptMutations: `
        updateAcDept(name: String!, _id: String!, isActive: Boolean): AcademicDepartment!
        addAcDept(name: String!): AcademicDepartment!
        toggleAcDept(_id: String!): AcademicDepartment!
    `
}