import { gql } from "@apollo/client";

export const signUpMutation = gql`
  query signup(
    $userName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signup(
      userName: $userName
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
      user {
        id
        userName
      }
    }
  }
`;
