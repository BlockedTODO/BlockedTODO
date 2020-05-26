import React from 'react';
import {Logo, LoadingButton} from 'components/';
import './Login.scss';

const LoginLayout = () => (
    <div className='login'>
        <Logo className='login-logo' />
        <LoginCard />
    </div>
);

const LoginCard = () => (
    <div className='login-card'>
        <CardTitle />

        <div className='form-container card-section'>
            <input
                className='form-input'
                placeholder='Email'
                type='email'
            />

            <input
                className='form-input'
                placeholder='Password'
                type='password'
            />

            <div className='buttons-container'>
                <LoadingButton className='login-button' label='login' />
                <button className='signup-button'>create account</button>
            </div>
        </div>
    </div>
);

const CardTitle = () => (
    <div className='card-title'>
        <h1 className='card-section'>Login</h1>
    </div>
);

export default LoginLayout;
