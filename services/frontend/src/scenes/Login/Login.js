import React, {useState} from 'react';
import {useInput, useLogin} from 'utils/hooks';
import LoginLayout from './LoginLayout';

const Login = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');

    const [getUser, {loading}] = useLogin({
        onError: (e) => setError(e.message)
    });

    const onSubmit = () => {
        getUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <LoginLayout
            isLoading={loading}
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSubmit={onSubmit}
            errorMessage={error}
        />
    );
};

export default Login;
