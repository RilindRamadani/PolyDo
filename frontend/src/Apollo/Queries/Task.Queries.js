import { gql, useQuery } from "@apollo/client";

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      _id
      title
      description
      dueDate
    }
  }
`;

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      _id
      title
      description
      dueDate
    }
  }
`;

export { GET_TASK, GET_TASKS };
