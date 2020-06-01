import {gql} from 'apollo-boost';

export const loginQuery = gql(`
    query User($email: String!, $password: String!){
        login(authenticationInput: {email: $email, password: $password}) {
            userId
            token
            tokenExpiration
        }
    }`
);
