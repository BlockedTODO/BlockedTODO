import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput, useRestClient} from 'hooks/';
import {loggedInContext} from 'Store';
import restClient from 'utils/restClient';
import LoginLayout from './LoginLayout';

const Login = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const history = useHistory();
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const loginRequest = () => restClient.post('/auth/login', {email: emailInput.value, password: passwordInput.value});
    const {run, error, isLoading} = useRestClient({
        deferFn: loginRequest,
        onResolve: () => {
            setIsLoggedIn(true);
            history.push('/repositories');
        }
    });

    return (
        <LoginLayout
            isLoading={isLoading}
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSubmit={run}
            errorMessage={error}
        />
    );
};

export default Login;
