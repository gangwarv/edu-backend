module.exports = {
    authTypes: `
    type AuthData {
        token: String
        userId: String!
        userName: String!
        expiresIn: Int!
    }
    type User {
        userName: String!
        password: String!
    }
    `,
    authQueries: `
    login(userName: String!, password: String!): AuthData!
    create(userName: String!, password: String!): User!
    menus: [String!]!
    `,
    authMutations: ''
}