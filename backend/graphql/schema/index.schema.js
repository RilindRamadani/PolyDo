import { buildSchema } from "graphql";
import { taskSchema } from "./task.schema.js";
import { listSchema } from "./list.schema.js";
import { userSchema } from "./user.schema.js"

export default buildSchema(`
  ${taskSchema}
  ${listSchema}
  ${userSchema}

    type RootQuery {
      tasks: [Task]
      task(id: ID!): Task
      lists: [List]
      list(id: ID!): List
      login(email: String!, password: String!) : AuthData
    }

    type RootMutation {
      createTask(title: String!, description: String, dueDate: String, listId: ID): Task
      updateTask(id: ID!, title: String, description: String, dueDate: String, completed: Boolean): Task
      deleteTask(id: ID!): Task
      createList(name: String!, description: String): List
      updateList(id: ID!, name: String, description: String): List
      deleteList(id: ID!): List
      addTaskToList(taskId: ID!, listId: ID!): Boolean
      addSubTask(parentId: ID!, title: String!, description: String, dueDate: String): Task

      createUser(UserInput : UserInput): User 
    }
      schema {
          query: RootQuery
          mutation: RootMutation
        }
    `);
