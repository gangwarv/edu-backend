module.exports = [
  `
    type Department {
        id: String
        name: String!
        isActive: Boolean!
        courses: [String!]!
        createdAt: String!
        updatedAt: String!
    }
    input DepartmentInput {
        id: String
        name: String!
        isActive: Boolean!
    }
    `,
  `
    departments(isActive: Boolean): [Department!]!
    department(id: String!): Department!
    `,
  `
    addDepartment(dept: DepartmentInput): Department!
    deleteDepartment(id: String!): Department!
    `,
];
