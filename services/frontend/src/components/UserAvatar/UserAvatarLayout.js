import React from 'react';
import {AccountCircleIcon} from 'assets/icons/';
import {UserDropdown} from 'components/';
import './UserAvatar.scss';

const UserAvatarLayout = ({closeableContainerProps, isDropdownOpen, onTriggerClick}) => (
    <div
        className='user-avatar-container'
        {...closeableContainerProps}
    >
        <div className='user-avatar-button' onClick={onTriggerClick}>
            <AccountCircleIcon className='user-icon' />
            <span className='user-name'>User Name</span>
        </div>

        <UserDropdown isOpen={isDropdownOpen} />
    </div>
);

export default UserAvatarLayout;
