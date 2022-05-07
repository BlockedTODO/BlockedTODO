import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSignup} from '../../hooks';
import SignupLayout from './SignupLayout';

const Signup = () => {
    const history = useHistory();
    const {emailInput, passwordInput, signup, isLoading, error} = useSignup();
    const onLogin = () => history.push('/login');

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
