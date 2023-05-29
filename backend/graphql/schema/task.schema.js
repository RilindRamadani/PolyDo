export const taskSchema = `
    type Task {
        _id: ID!
        title: String!
        description: String
        dueDate: String
        completed: Boolean!
        subTasks: [Task]
        createdAt: String!
        updatedAt: String!
        parentId: ID
}`