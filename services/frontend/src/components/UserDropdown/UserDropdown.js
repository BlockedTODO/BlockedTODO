import React from 'react';
import {useHistory} from 'react-router-dom';
import UserDropdownLayout from './UserDropdownLayout';

const UserDropdown = ({isOpen}) => {
    const history = useHistory();

    const onSettingsClick = () => history.push('/404');
    const onLogoutClick = () => history.push('/404');

    return (
        <UserDropdownLayout
            isOpen={isOpen}
            onSettingsClick={onSettingsClick}
            onLogoutClick={onLogoutClick}
        />
    );
};

export default UserDropdown;
