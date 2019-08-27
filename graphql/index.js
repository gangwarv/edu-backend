var graphqlHTTP = require('express-graphql');
var graphQLSchema = require('./schemas');
var resolvers = require('./resolvers')


module.exports = graphqlHTTP({
    schema: graphQLSchema,
    rootValue: resolvers,
    graphiql: true
})

