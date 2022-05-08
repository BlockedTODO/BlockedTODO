import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSignup} from '../../hooks';
import SignupLayout from './SignupLayout';

const Signup = () => {
    const navigate = useNavigate();
    const {emailInput, passwordInput, signup, isLoading, error} = useSignup();
    const onLogin = () => navigate('/login');

    return (
        <SignupLayout
            isLoading={isLoading}
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSignup={signup}
            onLogin={onLogin}
            errorMessage={error}
        />
    );
};

export default Signup;
