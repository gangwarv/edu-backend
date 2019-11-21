module.exports = [
    `
    type Course {
        id: ID!
        code: String!
        type: String!
        name: String!
        isActive: Boolean!
        isLateral: Boolean!
        departmentName: String!
        department: String!
        activeForAdmission: Boolean
        duration: String!
        createdAt: String!
        updatedAt: String!
    }
    input CourseInput {
        id: String
        code: String!
        type: String!
        name: String!
        department: String!
        duration: String!
        isLateral: Boolean
        isActive: Boolean
    }
    `,
    `
    courses(isActive: Boolean, department: String): [Course!]!
    course(id: String!): Course!
    `,
    `
    addCourse(course: CourseInput!): Course!
    toggleCourse(id: String!): Course!
    `
]