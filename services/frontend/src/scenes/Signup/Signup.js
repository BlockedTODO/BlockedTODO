import React, {useState} from 'react';
import {useInput, useLogin} from 'utils/hooks';
import {useMutation} from '@apollo/client';
import {signupMutation} from 'graphql/operations/';
import SignupLayout from './SignupLayout';

const Signup = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');

    const [logIn, {loading: loginLoading}] = useLogin({
        onError: (e) => setError(e.message)
    });
    const [createUser, {loading: signupLoading}] = useMutation(signupMutation, {
        onCompleted: () => logIn({variables: {email: emailInput.value, password: passwordInput.value}}),
        onError: (e) => setError(e.message)
    });

    const onSignup = () => {
        createUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <SignupLayout
            isLoading={signupLoading || loginLoading}
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSignup={onSignup}
            errorMessage={error}
        />
    );
};

export default Signup;
