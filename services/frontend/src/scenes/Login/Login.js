import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from 'utils/hooks';
import {useLazyQuery} from '@apollo/react-hooks';
import {loginQuery} from 'graphql/operations/';
import LoginLayout from './LoginLayout';

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
