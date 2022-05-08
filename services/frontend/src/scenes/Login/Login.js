import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useLogin} from '../../hooks';
import LoginLayout from './LoginLayout';

const Login = () => {
    const navigate = useNavigate();
    const {emailInput, passwordInput, login, isLoading, error} = useLogin();
    const onSignup = () => navigate('/signup');

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
