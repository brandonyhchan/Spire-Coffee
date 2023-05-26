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
    $userLocation: locationInput
  ) {
    returnAllCafes(
      filterByName: $filterByName
      busyFilter: $busyFilter
      noiseFilter: $noiseFilter
      priceFilter: $priceFilter
      distanceFilter: $distanceFilter
      userLocation: $userLocation
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
      distance
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

export const cafeMutation = gql`
  mutation updateCafeInfo(
    $stringId: String!
    $busyness: filterOptions
    $noisiness: filterOptions
  ) {
    updateCafeInfo(
      stringId: $stringId
      busyness: $busyness
      noisiness: $noisiness
    ) {
      id
      busyness
      noisiness
    }
  }
`;
