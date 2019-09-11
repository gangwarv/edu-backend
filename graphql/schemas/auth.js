module.exports = {
    authTypes: `
    type AuthData {
        token: String
        userId: String!
        userName: String!
        expiresIn: Int!
        privileges: String!
    }
    type Role {
        _id: ID!
        name: String!
        privileges: String!
    }
    type User {
        _id: ID!
        userName: String!
        password: String!
        privileges: String!
    }
    type Menu {
        sortOrder: String
        module: String!
        text: String!
        path: String!
        position: String!
    }

    `,
    authQueries: `
    login(userName: String!, password: String!): AuthData!
    menus: [Menu!]!

    get: String
    users: [User!]!
    roles: [Role!]!
    `,
    authMutations: `
    addUser(userName: String!, password: String!, privileges: String!): User!
    addRole(name: String!, privileges: String!): Role!
    `
}