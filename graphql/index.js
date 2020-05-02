var graphqlHTTP = require('express-graphql');
var graphQLSchema = require('./schemas');
var resolvers = require('./resolvers')

var ISODate = require('./scaler')

module.exports = graphqlHTTP({
    schema: graphQLSchema,
    rootValue: {...resolvers,ISODate},
    graphiql: true,

})

