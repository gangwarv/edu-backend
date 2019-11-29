module.exports = [
    `
    type Category {
        id: ID!
        name: String!
        isActive: Boolean!
    }
    `,
    `
    categories(isActive: Boolean): [Category!]!
    category(id: String!): Category!
    `,
     `
    addCategory(id: String, name: String!, isActive: Boolean!): Category!
    deleteCategory(id: String!): Category!
    `
]