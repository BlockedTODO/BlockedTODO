import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from 'utils/hooks';
import {useMutation} from '@apollo/react-hooks';
import {signupMutation} from 'graphql/operations/';
import SignupLayout from './SignupLayout';

const Signup = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');
    const history = useHistory();

    const onSuccessfulSignup = (_data) => {
        history.push('/');
    }
    const [createUser, {loading}] = useMutation(signupMutation, {
        onCompleted: onSuccessfulSignup,
        onError: (e) => setError(e.message)
    });

    const onSignup = () => {
        createUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <SignupLayout isLoading={loading} emailInput={emailInput} passwordInput={passwordInput} onSignup={onSignup} errorMessage={error} />
    );
};

export default Signup;
