import React from 'react';
import './Login.scss';

const LoginLayout = () => (
    <div className='login'>
        <code className='login-logo'>//BlockedTODO</code> {/* eslint-disable-line react/jsx-no-comment-textnodes */}

        <input
            className='login-form-input'
            placeholder='Email'
            type='email'
        />

        <input
            className='login-form-input'
            placeholder='Password'
            type='password'
        />
    </div>
);

export default LoginLayout;
