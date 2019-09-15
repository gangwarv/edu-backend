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
        isActive: Boolean
        privileges: String!
    }
    type User {
        _id: ID!
        userName: String!
        password: String!
        userType: String!
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
    menus: [Menu!]!

    get: String
    users: [User!]!
    roles: [Role!]!
    `,
    authMutations: `
    login(userName: String!, password: String!): AuthData!
    addUser(userName: String!, password: String!, role: String!): User!
    addRole(name: String!, privileges: String!): Role!
    `
}