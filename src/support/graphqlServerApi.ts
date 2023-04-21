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

export const returnAllCafeQuery = gql`
  query ReturnAllCafes(
    $filterByName: String
    $busyFilter: filterOptions
    $noiseFilter: filterOptions
    $priceFilter: [filterOptions]
    $distanceFilter: Int
    $userLat: Float
    $userLong: Float
  ) {
    returnAllCafes(
      filterByName: $filterByName
      busyFilter: $busyFilter
      noiseFilter: $noiseFilter
      priceFilter: $priceFilter
      distanceFilter: $distanceFilter
      userLat: $userLat
      userLong: $userLong
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

export const getCafeInfo = gql`
  query getCafeInfo($stringId: String!) {
    getCafeInfo(stringId: $stringId) {
      id
      name
      street
      city
      province
      postalCode
      phoneNumber
      website
      profilePhotoURL
      busyness
      noisiness
      price
    }
  }
`;
