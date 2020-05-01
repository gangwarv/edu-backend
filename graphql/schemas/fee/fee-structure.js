module.exports = [
    `
    type FeeCategory {
        id: ID!
        name: String!
    }

    type FeeStructure {
        id: ID!
        fsSession: String!
        fsCategory: String!
        courseName: String
        year: String
        feeItemName: String!
        feeType: String!
        feeAmount: Float!
        dueDate: String
        feeType: String!
        isOptional: Boolean!  
    }

    `,
    `
    feeCategories: [FeeCategory!]!
    `,
    `
    addFeeCategory(id: String, name: String!): FeeCategory!

    `
]