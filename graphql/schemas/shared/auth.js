module.exports = [
    `
    type AuthData {
        userId: String!
        userName: String!
        token: String!
        expiresIn: Float!
        roleName: String!
        privileges: String!
    }
    type LoginData {
        menus: [Menu!]!
        data: AuthData!
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
        userRef: String
        isActive: Boolean!

        email: String
        blocked: Boolean
        retryAttempts: Int

        role: String!
        roleName: String!
        privileges: String!
        updatedAt: ISODate
    }
    input UserInput {
        id: String
        firstName: String!
        lastName: String!
        userName: String!
        password: String
        mobile: String!
        userType: String!
        userRef: String
        email: String
        isActive: Boolean!
        role: String!
    }
    type Menu {
        text: String!
        path: String!
        module: String!
        privilege: String
        position: String!
    }
    `,
    `

    users: [User!]!
    user(id:String!): User!
    roles: [Role!]!
    role(id:String!): Role!
    appmodules: [AppModule!]!
    `,
   `
    login(userName: String!, password: String!): LoginData!

    addUser(user: UserInput): User!

    addRole(id: String, name: String!, privileges: String!, isActive: Boolean): Role!
    deleteRole(id: String!): Role!
    `
];