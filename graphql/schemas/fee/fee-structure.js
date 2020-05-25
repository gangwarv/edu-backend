module.exports = [
  `
    type FeeCategory {
        id: ID!
        name: String!
    }

    type CourseFeeStructure {
        fsSession: String!
        fsCategory: String!
        id: String!
        code: String!
        courseName: String!
        feeDetails: [FeeStructure!]! 
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
        groupName: String!
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
    
    courseFeeStructure(fsSession: String!, fsCategory: String!): [CourseFeeStructure!]!
    otherFeeStructure(fsSession: String!, fsCategory: String!): [FeeStructure!]!

    feeStructure(fsSession: String!, fsCategory: String!, feeType: String!, course: String, year: String, feeItem: String): [FeeStructure!]!

    `,
  `
    addFeeCategory(id: String!, name: String!): FeeCategory!

    addFeeStructure(fs: [FeeStructureInput!]!): [FeeStructure!]!

    `,
];
