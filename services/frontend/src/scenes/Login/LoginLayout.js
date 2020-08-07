import React from 'react';
import {Logo, LoadingButton, GithubLoginButton, TextField, FormError} from 'components/';
import './Login.scss';

const LoginLayout = (props) => (
    <div className='login'>
        <Logo className='login-logo' />
        <LoginCard {...props} />
    </div>
);

const LoginCard = ({emailInput, passwordInput, onSubmit, isLoading, errorMessage}) => (
    <div className='login-card'>
        <div className='card-title'>
            <h1 className='card-section'>Login</h1>
        </div>

        <Separator />

        <FormError message={errorMessage} />

        <div className='form-container card-section'>
            <div className='social-buttons-container'>
                <GithubLoginButton className='github-button' />
            </div>

            <div className='or-separator'>
                <Separator />
                <span className='or'>OR</span>
                <Separator />
            </div>

            <div className='email-password-container'>
                <TextField className='form-input' label='Email' type='email' {...emailInput} />
                <TextField className='form-input' label='Password' type='password' {...passwordInput} />
            </div>

            <div className='buttons-container'>
                <LoadingButton className='login-button' label='login' onClick={onSubmit} isLoading={isLoading} />
                <button className='signup-button'>create account</button>
            </div>
        </div>
    </div>
);

const Separator = () => (
    <div className='separator' />
);

export default LoginLayout;
