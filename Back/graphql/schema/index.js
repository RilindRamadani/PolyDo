const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Task {
      _id: ID!
      title: String!
      description: String
      dueDate: String
      completed: Boolean!
      subTasks: [Task]
      list: List
      createdAt: String!
      updatedAt: String!
    }
  
    type List {
      _id: ID!
      name: String!
      description: String
      createdAt: String!
      updatedAt: String!
    }
  
    type User {
      _id: ID!,
      username: String!
      email : String!
      password : String
      firstName : String!
      lastName : String!
    }

    input UserInput {
      username: String!
      email : String!
      password : String
      firstName : String!
      lastName : String!    
    }
    type RootQuery {
      tasks: [Task]
      task(id: ID!): Task
      lists: [List]
      list(id: ID!): List

    }
  
    type RootMutation {
      createTask(title: String!, description: String, dueDate: String, listId: ID): Task
      updateTask(id: ID!, title: String, description: String, dueDate: String, completed: Boolean): Task
      deleteTask(id: ID!): Task
      createList(name: String!, description: String): List
      updateList(id: ID!, name: String, description: String): List
      deleteList(id: ID!): List

      createUser(UserInput : UserInput): User 
    }
      schema {
          query: RootQuery
          mutation: RootMutation
        }
    `);
