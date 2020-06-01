import {gql} from 'apollo-boost';

export const signupMutation = gql`
    mutation CreateUser($email: String!, $password: String!){
        createUser(userInput: {email: $email, password: $password}) {
            id
            email
        }
    }
`;
