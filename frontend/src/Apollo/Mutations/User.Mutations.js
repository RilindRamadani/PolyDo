import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      UserInput: {
        username: $username
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      _id
      username
      email
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateUser(
      id: $id
      userInput: {
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      username
      email
      firstName
      lastName
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export { CREATE_USER, UPDATE_USER, DELETE_USER };
