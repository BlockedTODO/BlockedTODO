import React, {useContext} from 'react';
import {useOutsideCloseable} from 'hooks/';
import {userContext} from 'Store';
import UserAvatarLayout from './UserAvatarLayout';

const UserAvatar = () => {
    const [user] = useContext(userContext);

    const {
        closeableContainerProps, isVisible: isDropdownOpen, setIsVisible: setIsDropdownOpen
    } = useOutsideCloseable();

    const onTriggerClick = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <UserAvatarLayout
            avatarUrl={user?.avatarUrl}
            closeableContainerProps={closeableContainerProps}
            onTriggerClick={onTriggerClick}
            isDropdownOpen={isDropdownOpen}
        />
    );
};

export default UserAvatar;
