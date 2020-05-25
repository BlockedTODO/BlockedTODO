import React from 'react';
import {AccountBoxIcon} from 'assets/icons/';
import './UserAvatar.scss';

const UserAvatarLayout = () => (
    <div className='user-avatar-container'>
        <AccountBoxIcon className='user-icon' />
        <span className='user-name'>Account Name</span>
    </div>
);

export default UserAvatarLayout;
