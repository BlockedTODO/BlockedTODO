import React from 'react';
import {useHistory} from 'react-router-dom';
import {useLogin} from '../../hooks';
import LoginLayout from './LoginLayout';

const Login = () => {
    const history = useHistory();
    const {emailInput, passwordInput, login, isLoading, error} = useLogin();
    const onSignup = () => history.push('/signup');

    return (
        <LoginLayout
            isLoading={isLoading}
            emailInput={emailInput}
            passwordInput={passwordInput}
            onLogin={login}
            onSignup={onSignup}
            errorMessage={error}
        />
    );
};

export default Login;
