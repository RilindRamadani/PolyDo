export const listSchema = 
`type List {
    _id: ID!
    name: String!
    description: String
    createdAt: String!
    updatedAt: String!
    tasks: [Task]
}`