import React from 'react';
import LoginLayout from './LoginLayout';
import {useInput} from 'utils/hooks';

const Login = () => {
    const emailInput = useInput();
    const passwordInput = useInput();

    const onSubmit = () => console.log(`${emailInput.value}, ${passwordInput.value}`);

    return (
        <LoginLayout emailInput={emailInput} passwordInput={passwordInput} onSubmit={onSubmit} />
    );
}

export default Login;
