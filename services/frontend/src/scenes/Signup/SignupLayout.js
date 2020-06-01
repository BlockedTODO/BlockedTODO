import React from 'react';
import {Logo, LoadingButton, TextField, FormError} from 'components/';
import './Signup.scss';

const SignupLayout = (props) => (
    <div className='signup'>
        <Logo className='signup-logo' />
        <SignupCard {...props} />
    </div>
);

const SignupCard = ({emailInput, passwordInput, onSignup, isLoading, errorMessage}) => (
    <div className='signup-card'>
        <CardTitle />
        <FormError message={errorMessage} />

        <div className='form-container card-section'>
            <TextField className='form-input' label='Email' type='email' {...emailInput} />
            <TextField className='form-input' label='Password' type='password' {...passwordInput} />

            <div className='buttons-container'>
                <LoadingButton className='signup-button' label='create account' onClick={onSignup} isLoading={isLoading} />
                <button className='login-button'>login</button>
            </div>
        </div>
    </div>
);

const CardTitle = () => (
    <div className='card-title'>
        <h1 className='card-section'>Signup</h1>
    </div>
);

export default SignupLayout;
