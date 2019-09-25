module.exports = {
    courseTypes: `
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
    courseQueries: `
    courses(isActive: Boolean): [Course!]!
    course(id: String!): Course!
    `,
    courseMutations: `
    addCourse(course: CourseInput!): Course!
    toggleCourse(id: String!): Course!
    `
}