const { buildSchema } = require('graphql')
const {authTypes, authQueries} = require('./auth')

module.exports = buildSchema(`
${authTypes}

type Book {
    _id: ID!
    title: String!
    price: Float!
    createdAt: String!
}

type Query {
    books: [Book!]!
    ${authQueries}
}

type Mutations {
    addBook(title: String!, price: Float!): Book!
}

`);