import { gql } from "@apollo/client";

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

//TODO : Get user by id and populate Profile component
//TODO : Expose update profile
export { LOGIN };
