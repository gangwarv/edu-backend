const { ApolloServer, gql } = require("apollo-server-express");
// const { typeDefs, resolvers } = require("./schema");
var ISODate = require("./scaler");
var customSchema = require("./schemas");
var customResolvers = require("./resolvers");
// console.log(customSchema)
customSchema = gql`
  ${customSchema}
`;
const str = `
type Book {
    title: String
  }

            type Author {
                name: String
            }
`;
var typeDefs = gql`
  ${str}
  type Query {
    getBooks(name: String): [Book]
    getAuthors: [Author]
  }
`;
var resolvers = {
  Query: {
    getBooks: (parent, { name }, req) => {
      console.log(req.isAuth, req.userName);
      return [{ title: name }];
    },
    getAuthors: () => {
      return ["A", "B"];
    },
  },
};

const server = new ApolloServer({
  typeDefs: customSchema,
  resolvers: {
    ISODate,
    ...customResolvers,
  },

  context: ({ req, res }) => {
    //   console.log(req.isAuth)

    return req;
  },
});

module.exports = (app) => {
  server.applyMiddleware({ app });
};
