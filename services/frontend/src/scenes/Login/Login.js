import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from 'utils/hooks';
import {useLazyQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import LoginLayout from './LoginLayout';

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
    const history = useHistory();

    /* FIXME: the current login implementation still has some vulnerabilities that need to be fixed before a full release.
    * Follow the instructions here: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#intro */
    const onSuccessfulLogin = ({login}) => {
        localStorage.setItem('authentication_token', login.token);
        history.push('/');
    }
    const [getUser, {loading}] = useLazyQuery(loginQuery, {
        onCompleted: onSuccessfulLogin,
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
