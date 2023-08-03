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
    $currentPage: Int
  ) {
    returnAllCafes(
      filterByName: $filterByName
      busyFilter: $busyFilter
      noiseFilter: $noiseFilter
      priceFilter: $priceFilter
      distanceFilter: $distanceFilter
      userLocation: $userLocation
      currentPage: $currentPage
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
    getCafeCount
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
  query addCafe($name: String!) {
    addCafe(name: $name) {
      cafe {
        id
        name
      }
    }
  }
`;

export const getUserInfo = gql`
  query getUserInfo($userName: String!) {
    getUserInfo(userName: $userName) {
      userName
      email
      firstName
      lastName
      photoName
      photoURL
    }
  }
`;

export const userMutation = gql`
  mutation updateUserInfo(
    $userName: String!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateUserInfo(
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      userName
      firstName
      lastName
      email
    }
  }
`;

export const passwordMutation = gql`
  mutation updatePassword($userName: String!, $password: String) {
    updatePassword(userName: $userName, password: $password) {
      userName
    }
  }
`;
