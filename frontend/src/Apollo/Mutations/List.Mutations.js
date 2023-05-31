import { gql } from "@apollo/client";

const CREATE_LIST = gql`
  mutation CreateList($name: String!, $description: String) {
    createList(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

const UPDATE_LIST = gql`
  mutation UpdateList($id: ID!, $name: String, $description: String) {
    updateList(id: $id, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id)
  }
`;

const ADD_TASK_TO_LIST = gql`
  mutation AddTaskToList($taskId: ID!, $listId: ID!) {
    addTaskToList(taskId: $taskId, listId: $listId)
  }
`;

export { CREATE_LIST, UPDATE_LIST, ADD_TASK_TO_LIST, DELETE_LIST };
