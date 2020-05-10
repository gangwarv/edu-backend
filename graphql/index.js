const { ApolloServer, gql } = require("apollo-server-express");
var ISODate = require("./scalers/iso-date");
var Json = require("./scalers/json");
var customSchema = require("./schemas");
var customResolvers = require("./resolvers");

customSchema = gql`
scalar ISODate
scalar Json
  ${customSchema}
`;

const server = new ApolloServer({
  typeDefs: customSchema,
  resolvers: {
    ...customResolvers,
    ISODate,
    Json
  },
});

module.exports = (app) => {
  server.applyMiddleware({ app });
};
