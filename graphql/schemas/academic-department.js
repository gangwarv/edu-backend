module.exports = {
    acDeptTypes: `
    type AcademicDepartment {
        id: String
        name: String!
        isActive: Boolean!
        courses: [String!]!
    }
    `,
    acDeptQueries: `
    acDepts(isActive: Boolean): [AcademicDepartment!]!
    `,
    acDeptMutations: `
        updateAcDept(id: String!, name: String!, isActive: Boolean): AcademicDepartment!
        addAcDept(name: String!): AcademicDepartment!
        toggleAcDept(id: String!): AcademicDepartment!
    `
}