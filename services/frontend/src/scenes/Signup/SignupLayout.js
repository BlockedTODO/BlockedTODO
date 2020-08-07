import React from 'react';
import {Logo, LoadingButton, TextField, Card} from 'components/';
import './Signup.scss';

const SignupLayout = (props) => (
    <div className='signup'>
        <Logo className='signup-logo' />
        <SignupCard {...props} />
    </div>
);

const SignupCard = ({emailInput, passwordInput, onSignup, isLoading, errorMessage}) => (
    <Card className='signup-card' errorMessage={errorMessage} title='Signup'>
        <div className='inputs-container'>
            <TextField className='form-input' label='Email' type='email' {...emailInput} />
            <TextField className='form-input' label='Password' type='password' {...passwordInput} />
        </div>

        <div className='buttons-container'>
            <LoadingButton className='signup-button' label='create account' onClick={onSignup} isLoading={isLoading} />
            <button className='login-button'>login</button>
        </div>
    </Card>
);

export default SignupLayout;
