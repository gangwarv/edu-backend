module.exports = [
    `
    type FeeGroup {
        id: ID!
        name: String!
    }

    type FeeItem {
        id: ID!
        name: String!
        group: String!
        groupName: String!
        isActive: Boolean!
    }
    `,
    `
    feeGroups(isActive: Boolean): [FeeGroup!]!

    feeItems(isActive: Boolean): [FeeItem!]!
    feeItem(id: String!): FeeItem!
    `,
    `
    addFeeGroup(id: String, name: String!): FeeGroup!
    deleteFeeGroup(id: String!): FeeGroup!

    addFeeItem(id: String, name: String!, isActive: Boolean!, group: String!): FeeItem!
    deleteFeeItem(id: String!): FeeItem!
    `
]