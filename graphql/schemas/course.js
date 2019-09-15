module.exports = {
    courseTypes: `
    type Course {
        _id: ID!
        code: String!
        type: String!
        name: String!
        isActive: Boolean!
        isLateral: Boolean!
        departmentName: String!
        department: String!
    }
    input CourseInput {
        code: String!
        type: String!
        name: String!
        department: String!
        isLateral: Boolean
    }
    `,
    courseQueries: `
    courses(isActive: Boolean): [Course!]!
    course(_id: String!): Course!
    `,
    courseMutations: `
    addCourse(course: CourseInput!): Course!
    toggleCourse(_id: String!): Course!
    `
}