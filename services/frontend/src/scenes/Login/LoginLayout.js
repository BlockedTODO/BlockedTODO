import React from 'react';
import {Logo, LoadingButton, GithubLoginButton, TextField, Separator, Card} from 'components/';
import {IS_PRODUCTION} from 'utils/environment';
import './Login.scss';

const LoginLayout = (props) => (
    <div className='login'>
        <Logo className='login-logo' />
        <LoginCard {...props} />
    </div>
);

const LoginCard = ({emailInput, passwordInput, onLogin, onSignup, isLoading, errorMessage}) => (
    <Card className='login-card' title='Login' errorMessage={errorMessage}>
        <div className='social-buttons-container'>
            <GithubLoginButton className='github-button' />
        </div>

        {!IS_PRODUCTION && (
            <React.Fragment>
                <div className='or-separator'>
                    <Separator />
                    <span className='or'>OR</span>
                    <Separator />
                </div>

                <TextField className='form-input' label='Email' type='email' {...emailInput} />
                <TextField className='form-input' label='Password' type='password' {...passwordInput} />

                <div className='buttons-container'>
                    <LoadingButton className='login-button' label='login' onClick={onLogin} isLoading={isLoading} />
                    <button className='signup-button' onClick={onSignup}>create account</button>
                </div>
            </React.Fragment>
        )}
    </Card>
);

export default LoginLayout;
