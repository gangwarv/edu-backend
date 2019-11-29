const { buildSchema } = require('graphql')
const AuthSchema = require('./auth')
const CategorySchema = require('./category')
const AcDeptSchema = require('./academic-department')
const CourseSchema = require('./course')

// const FeeSchema = require('./fee-schema')

module.exports = buildSchema(`
${AuthSchema[0]}
${CategorySchema[0]}
${AcDeptSchema[0]}
${CourseSchema[0]}

 

type Query {
    ${AuthSchema[1]}
    ${CategorySchema[1]}
    ${AcDeptSchema[1]}
    ${CourseSchema[1]}

  
}

type Mutation {
    ${AuthSchema[2]}
    ${CategorySchema[2]}
    ${AcDeptSchema[2]}
    ${CourseSchema[2]}
    
}
`);