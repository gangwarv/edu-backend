module.exports = {
    acDeptTypes: `
    type AcademicDepartment {
        id: String
        name: String!
        isActive: Boolean!
        courses: [String!]!
        createdAt: String!
        updatedAt: String!
    }
    input AcademicDepartmentInput {
        id: String
        name: String!
        isActive: Boolean!
    }
    `,
    acDeptQueries: `
    acDepts(isActive: Boolean): [AcademicDepartment!]!
    `,
    acDeptMutations: `
        addAcDept(dept: AcademicDepartmentInput): AcademicDepartment!
        toggleAcDept(id: String!): AcademicDepartment!
        deleteAcDept(id: String!): AcademicDepartment!
    `
}