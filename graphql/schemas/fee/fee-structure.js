module.exports = [
  `
    type FeeCategory {
        id: ID!
        name: String!
    }
    type CourseFeeStructure {
        id: ID!
        fsSession: String!
        fsCategory: String!
        course: String
        courseName: String
    }
    type FeeStructure {
        id: ID!
        fsSession: String!
        fsCategory: String!
        course: String
        courseName: String
        year: String
        label: String
        feeItem: String!
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
        label: String
        feeItem: String!
        feeAmount: Float!
        fromDate: ISODate
        dueDate: ISODate
        feeType: String!
        isOptional: Boolean!
        isDeleted: Boolean
    }

    `,
  `
    feeCategories: [FeeCategory!]!
    
    feeStructures(fsSession: String!, fsCategory: String!): [CourseFeeStructure!]!
    feeStructure(fsSession: String!, fsCategory: String, feeType: String, course: String): [FeeStructure!]!

    `,
  `
    addFeeCategory(id: String!, name: String!): FeeCategory!

    addFeeStructure(fs: [FeeStructureInput!]!): [FeeStructure!]!

    `,
];
