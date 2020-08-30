import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {loggedInContext} from 'Store';
import restClient from 'utils/restClient';
import {useRestClient} from 'hooks';
import UserDropdownLayout from './UserDropdownLayout';

const UserDropdown = ({isOpen}) => {
    const history = useHistory();
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const onSettingsClick = () => history.push('/404');
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
