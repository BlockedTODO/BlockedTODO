import React from 'react';
import {Logo, LoadingButton, TextField} from 'components/';
import './Login.scss';

const LoginLayout = (props) => (
    <div className='login'>
        <Logo className='login-logo' />
        <LoginCard {...props} />
    </div>
);

const LoginCard = ({emailInput, passwordInput, onSubmit}) => (
    <div className='login-card'>
        <CardTitle />

        <div className='form-container card-section'>
            <TextField className='form-input' label='Email' type='email' {...emailInput} />
            <TextField className='form-input' label='Password' type='password' {...passwordInput} />

            <div className='buttons-container'>
                <LoadingButton className='login-button' label='login' onClick={onSubmit}/>
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
