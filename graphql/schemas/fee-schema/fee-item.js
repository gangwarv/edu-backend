module.exports = [
    `
    type FeeItem {
        id: ID!
        name: String!
        type: String
    }
    `,
    `
    feeItems(isActive: Boolean): [FeeItem!]!
    feeItem(id: String!): Category!
    `,
    `
    addFeeItem(id: String, name: String!): FeeItem!
    deleteFeeItem(id: String!): FeeItem!
    `
]