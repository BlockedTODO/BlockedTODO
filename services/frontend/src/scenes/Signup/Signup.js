import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput, useRestClient} from 'hooks/';
import {useMutation} from '@apollo/client';
import {signupMutation} from 'graphql/operations/';
import {loggedInContext} from 'Store';
import restClient from 'utils/restClient';
import SignupLayout from './SignupLayout';

const Signup = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const history = useHistory();
    const [error, setError] = useState('');
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const loginRequest = () => restClient.post('/auth/login', {email: emailInput.value, password: passwordInput.value});
    const {run: login, isLoading: loginLoading} = useRestClient({
        deferFn: loginRequest,
        onResolve: () => {
            setIsLoggedIn(true);
            history.push('/repositories');
        },
        onReject: (error) => setError(error)
    });

    const [createUser, {loading: signupLoading}] = useMutation(signupMutation, {
        onCompleted: () => login(),
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
