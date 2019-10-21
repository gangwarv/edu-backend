module.exports = {
    categoryTypes: `
    type Category {
        id: ID!
        name: String!
    }
    `,
    categoryQueries: `
    categories(isActive: Boolean): [Category!]!
    `,
    categoryMutations: `
    addCategory(id: String, name: String!): Category!
    deleteCategory(id: String!): Category!
    `
}