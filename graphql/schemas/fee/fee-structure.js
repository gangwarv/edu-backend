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
        id: ID
        fsSession: String!
        fsCategory: String!
        feeType: String!
        course: String
        year: String
        label: String
        feeItem: String!
        feeAmount: Float!
        fromDate: ISODate
        dueDate: ISODate
        isOptional: Boolean!

        courseName: String
        feeItemName: String!
    }
    input FeeStructureInput {
        id: ID
        fsSession: String!
        fsCategory: String!
        feeType: String!
        course: String
        year: String
        label: String
        feeItem: String!
        feeAmount: Float!
        fromDate: ISODate
        dueDate: ISODate
        isOptional: Boolean!

        isDeleted: Boolean!
    }

    `,
  `
    feeCategories: [FeeCategory!]!
    
    feeStructures(fsSession: String!, fsCategory: String!): [CourseFeeStructure!]!
    feeStructure(fsSession: String!, fsCategory: String!, feeType: String!, course: String): [FeeStructure!]!

    `,
  `
    addFeeCategory(id: String!, name: String!): FeeCategory!

    addFeeStructure(fs: String!): [FeeStructure!]!

    `,
];
