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
        firstName: String!
        lastName: String!
        userName: String!
        password: String
        mobile: String!
        userType: String!
        isActive: Boolean!

        email: String
        blocked: Boolean
        retryAttempts: Int

        role: String!
        roleName: String!
    }
    input UserInput {
        id: ID
        firstName: String!
        lastName: String!
        userName: String!
        password: String
        mobile: String!
        userType: String
        email: String
        userRef: String
        isActive: Boolean
        role: String!
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

    addUser(user: UserInput): User!

    addRole(id: String, name: String!, privileges: String!, isActive: Boolean): Role!
    deleteRole(id: String!): Role!
    `
}