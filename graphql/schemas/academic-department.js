module.exports = [
    `
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
     `
    acDepts(isActive: Boolean): [AcademicDepartment!]!
    acDept(id: String!): AcademicDepartment!
    `,
    `
        addAcDept(dept: AcademicDepartmentInput): AcademicDepartment!
        toggleAcDept(id: String!): AcademicDepartment!
        deleteAcDept(id: String!): AcademicDepartment!
    `
];