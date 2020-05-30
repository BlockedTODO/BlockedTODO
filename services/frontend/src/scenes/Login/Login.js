import React, {useState} from 'react';
import LoginLayout from './LoginLayout';
import {useInput} from 'utils/hooks';
import {useLazyQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const loginQuery = gql`
    query User($email: String!, $password: String!){
        login(authenticationInput: {email: $email, password: $password}) {
            userId
            token
            tokenExpiration
        }
    }
`;

const Login = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');

    const [getUser, {loading}] = useLazyQuery(loginQuery, {
        onCompleted: ({login}) => localStorage.setItem('authentication_token', login.token),
        onError: (e) => setError(e.message)
    });

    const onSubmit = () => {
        getUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <LoginLayout isLoading={loading} emailInput={emailInput} passwordInput={passwordInput} onSubmit={onSubmit} errorMessage={error} />
    );
};

export default Login;
