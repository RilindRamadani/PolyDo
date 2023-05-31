import { gql } from "@apollo/client";

const GET_LIST = gql`
  query GetList($id: ID!) {
    list(id: $id) {
      _id
      name
      description
    }
  }
`;

const GET_LISTS = gql`
  query GetLists {
    lists {
      _id
      name
      description
      tasks {
        _id
        title
        description
      }
    }
  }
`;

export { GET_LISTS, GET_LIST };
