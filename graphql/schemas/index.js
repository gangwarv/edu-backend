const { buildSchema } = require('graphql')
const {authTypes, authQueries, authMutations} = require('./auth')
const {categoryTypes, categoryQueries, categoryMutations } = require('./category')
const {acDeptTypes, acDeptQueries, acDeptMutations } = require('./academic-department')
const {courseTypes, courseQueries, courseMutations} = require('./course')

module.exports = buildSchema(`
${authTypes}
${courseTypes}
${acDeptTypes}
${categoryTypes}

type Query {
    ${authQueries}
    ${courseQueries}
    ${acDeptQueries}
    ${categoryQueries}
}

type Mutation {
    ${authMutations}
    ${courseMutations}
    ${acDeptMutations}
    ${categoryMutations}
}
`);