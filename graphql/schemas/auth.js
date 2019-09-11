module.exports = {
    authTypes: `
    type AuthData {
        token: String
        userId: String!
        userName: String!
        expiresIn: Int!
        role: Role
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
        role: Role!
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
    addUser(userName: String!, password: String!, role: String!): User!
    addRole(name: String!, privileges: String!): Role!
    `
}