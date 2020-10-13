import React from 'react';
import {Logo, UserAvatar} from 'components/';
import './Header.scss';

const HeaderLayout = ({avatarUrl}) => (
    <header className='header'>
        <div className='left-container'>
            <Logo />
        </div>
        <div className='right-container'>
            <UserAvatar avatarUrl={avatarUrl} />
        </div>
    </header>
);

export default HeaderLayout;
