import { gql } from "@apollo/client";

export const signUpMutation = gql`
    mutation signup($userName: String!, $email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        signup(userName: $userName, email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
            token 
            user {
                firstName
                lastName
                email
                password
            }
        }
    }
`