module.exports = {
    categoryTypes: `
    type Category {
        _id: ID!
        name: String!
    }
    `,
    categoryQueries: `
    categories(isActive: Boolean): [Category!]!
    `,
    categoryMutations: `
    addCategory(name: String!): Category!
    `
}