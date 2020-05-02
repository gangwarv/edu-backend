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
        oddEven: String
        feeItemName: String!
        feeAmount: Float!
        dueDate: String
        feeType: String!
        isOptional: Boolean!

    }
    input FeeStructureInput {
        id: ID
        fsSession: String!
        fsCategory: String!
        course: String
        year: String
        oddEven: String
        feeItem: String!
        feeAmount: Float!
        dueDate: String
        feeType: String!
        isOptional: Boolean!
        isDeleted: Boolean
    }

    `,
    `
    feeCategories: [FeeCategory!]!

    feeStructures: [FeeStructure!]!

    `,
    `
    addFeeCategory(id: String, name: String!): FeeCategory!

    addFeeStructure(fs: [FeeStructureInput!]!): [FeeStructure!]!

    `
]