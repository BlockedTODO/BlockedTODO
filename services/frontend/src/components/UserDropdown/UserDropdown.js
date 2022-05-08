import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {loggedInContext} from 'Store';
import restClient from 'utils/restClient';
import {useRestClient} from 'hooks';
import UserDropdownLayout from './UserDropdownLayout';

const UserDropdown = ({isOpen}) => {
    const navigate = useNavigate();
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const onSettingsClick = () => navigate('/404');
    const {run: onLogoutClick} = useRestClient({
        deferFn: () => restClient.post('/auth/logout'),
        onResolve: () => setIsLoggedIn(false)
    });

    return (
        <UserDropdownLayout
            isOpen={isOpen}
            onSettingsClick={onSettingsClick}
            onLogoutClick={onLogoutClick}
        />
    );
};

export default UserDropdown;
