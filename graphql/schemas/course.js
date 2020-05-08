module.exports = [
    `
    type Course {
        id: ID!
        code: String!
        type: String!
        name: String!
        isActive: Boolean!
        admissionOpen: Boolean
        admissionLastDate: ISODate
        departmentName: String!
        department: String!
        activeForAdmission: Boolean
        duration: String!
        createdAt: String!
        updatedAt: ISODate!
    }
    input CourseInput {
        id: String
        code: String!
        type: String!
        name: String!
        department: String!
        duration: String!
        isActive: Boolean
    }
    `,
    `
    courses(isActive: Boolean, department: String): [Course!]!
    course(id: String!): Course!
    `,
    `
    addCourse(course: CourseInput!): Course!
    deleteCourse(id: String!): Course!
    updateCourses(ids: [String!]!, command: String!, data: String): [Course!]!
    `
]