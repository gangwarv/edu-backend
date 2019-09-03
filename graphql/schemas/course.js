module.exports = {
    courseTypes: `
    type Course {
        _id: ID!
        type: String!
        name: String!
        isActive: Boolean!
        departmentName: String!
        department: String!
    }
    input CourseInput {
        type: String!
        name: String!
        isActive: Boolean
        department: String!
    }
    `,
    courseQueries: `
    courses(isActive: Boolean): [Course!]!
    `,
    courseMutations: `
    addCourse(course: CourseInput!): Course!
    toggleCourse(_id: String!): Course!
    `
}