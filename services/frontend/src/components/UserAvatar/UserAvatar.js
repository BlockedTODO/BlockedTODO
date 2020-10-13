import React from 'react';
import {useOutsideCloseable} from 'hooks/';
import UserAvatarLayout from './UserAvatarLayout';

const UserAvatar = ({avatarUrl}) => {
    const {
        closeableContainerProps, isVisible: isDropdownOpen, setIsVisible: setIsDropdownOpen
    } = useOutsideCloseable();

    const onTriggerClick = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <UserAvatarLayout
            avatarUrl={avatarUrl}
            closeableContainerProps={closeableContainerProps}
            onTriggerClick={onTriggerClick}
            isDropdownOpen={isDropdownOpen}
        />
    );
};

export default UserAvatar;
