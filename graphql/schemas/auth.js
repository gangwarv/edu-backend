module.exports = {
    authTypes: `
    type AuthData {
        token: String
        userId: String!
        userName: String!
        expiresIn: Int!
        role: Role
    }
    type AppModule {
        id: ID!
        name: String!
        privileges: String!
        isActive: Boolean
    }
    type Role {
        id: ID!
        name: String!
        privileges: String!
        isActive: Boolean
    }
    type User {
        id: ID!
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

    users: [User!]!
    user(id:String!): User!
    roles: [Role!]!
    role(id:String!): Role!
    appmodules: [AppModule!]!
    `,
    authMutations: `
    login(userName: String!, password: String!): AuthData!
    addUser(userName: String!, password: String!, role: String!): User!
    addRole(id: String, name: String!, privileges: String!, isActive: Boolean): Role!
    deleteRole(id: String!): Role!
    `
}