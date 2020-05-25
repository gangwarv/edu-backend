module.exports = [
    `
    type SessionTask{
        task: String!
        status: String!
    }
    type Session {
        id: ID!
        name: String!
        year: Int!
        tasks: [SessionTask!]
    }
    `,
    `
    sessions(top: Int): [Session!]!
    session(id: String!): Session!
    `,
     `
    addSession(id: String!, name: String!, year: Int!): Session!
    `
]