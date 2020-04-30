module.exports = [
    `
    type FeeType {
        id: ID!
        name: String!
    }

    type FeeItem {
        id: ID!
        name: String!
        type: String!
        typeName: String!
        isActive: Boolean!
    }
    `,
    `
    feeTypes(isActive: Boolean): [FeeType!]!

    feeItems(isActive: Boolean): [FeeItem!]!
    feeItem(id: String!): FeeItem!
    `,
    `
    addFeeType(id: String, name: String!): FeeType!
    deleteFeeType(id: String!): FeeType!

    addFeeItem(id: String, name: String!, isActive: Boolean!, type: String!): FeeItem!
    deleteFeeItem(id: String!): FeeItem!
    `
]