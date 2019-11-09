module.exports = {
    categoryTypes: `
    type Category {
        id: ID!
        name: String!
        isActive: Boolean!
    }
    `,
    categoryQueries: `
    categories(isActive: Boolean): [Category!]!
    category(id: String!): Category!
    `,
    categoryMutations: `
    addCategory(id: String, name: String!, isActive: Boolean!): Category!
    deleteCategory(id: String!): Category!
    `
}