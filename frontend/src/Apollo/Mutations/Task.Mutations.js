import { gql } from "@apollo/client";

const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String
    $dueDate: String
    $listId: ID
  ) {
    createTask(
      title: $title
      description: $description
      dueDate: $dueDate
      listId: $listId
    ) {
      _id
      title
      description
      dueDate
    }
  }
`;
const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $dueDate: String
    $completed: Boolean
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      dueDate: $dueDate
      completed: $completed
    ) {
      _id
      title
      description
      dueDate
      completed
    }
  }
`;
const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
const ADD_SUBTASK = gql`
  mutation AddSubTask(
    $parentId: ID!
    $title: String!
    $description: String
    $dueDate: String
  ) {
    addSubTask(
      parentId: $parentId
      title: $title
      description: $description
      dueDate: $dueDate
    )
  }
`;

export { ADD_SUBTASK, DELETE_TASK, UPDATE_TASK, CREATE_TASK };
