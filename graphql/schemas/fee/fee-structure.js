module.exports = [
  `
    type FeeCategory {
        id: ID!
        name: String!
    }

    type Aggregation {
      feeType: String
      count: Int
      sum: Int
    }

    type CourseFeeStructure {
        fsSession: String!
        fsCategory: String!
        course: String
        courseName: String
        fsSummary: [Aggregation]
        academic: Aggregation
        nonAcademic: Aggregation
        other: Aggregation
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

        courseName: String
        feeItemName: String!
    }
    input FeeStructureInput {
        id: String
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

        isDeleted: Boolean!
    }

    `,
  `
    feeCategories: [FeeCategory!]!
    
    feeStructures(fsSession: String!, fsCategory: String!): [CourseFeeStructure!]!
    feeStructure(fsSession: String!, fsCategory: String!, feeType: String!, course: String, year: String, feeItem: String): [FeeStructure!]!

    `,
  `
    addFeeCategory(id: String!, name: String!): FeeCategory!

    addFeeStructure(fs: [FeeStructureInput!]!): [FeeStructure!]!

    `,
];
