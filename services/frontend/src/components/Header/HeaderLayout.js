import React from 'react';
import {Logo, UserAvatar} from 'components/';
import './Header.scss';

const HeaderLayout = () => (
    <header className='header'>
        <div className='left-container'>
            <Logo />
        </div>
        <div className='right-container'>
            <UserAvatar />
        </div>
    </header>
);

export default HeaderLayout;
