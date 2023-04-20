import { gql } from "@apollo/client";

export const signUpMutation = gql`
  query signUp(
    $userName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
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

export const loginQuery = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        id
        userName
      }
    }
  }
`;

export const cafeQuery = gql`
  query ReturnAllCafes(
    $filterByName: String
    $busyFilter: filterOptions
    $noiseFilter: filterOptions
    $priceFilter: [filterOptions]
  ) {
    returnAllCafes(
      filterByName: $filterByName
      busyFilter: $busyFilter
      noiseFilter: $noiseFilter
      priceFilter: $priceFilter
    ) {
      id
      stringId
      name
      street
      city
      province
      profilePhotoURL
      busyness
      noisiness
      price
    }
  }
`;
