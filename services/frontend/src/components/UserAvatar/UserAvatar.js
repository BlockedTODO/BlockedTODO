import React from 'react';
import UserAvatarLayout from './UserAvatarLayout';
import {useOutsideCloseable} from 'hooks/';

const UserAvatar = () => {
    const {
        closeableContainerProps, isVisible: isDropdownOpen, setIsVisible: setIsDropdownOpen
    } = useOutsideCloseable();

    const onTriggerClick = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <UserAvatarLayout
            closeableContainerProps={closeableContainerProps}
            onTriggerClick={onTriggerClick}
            isDropdownOpen={isDropdownOpen}
        />
    );
};

export default UserAvatar;
