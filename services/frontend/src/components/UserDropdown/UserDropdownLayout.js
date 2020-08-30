import React from 'react';
import {Dropdown, DropdownItem, Separator} from 'components/';
import {SettingsIcon, LogoutIcon} from 'assets/icons/';
import './UserDropdown.scss';

const UserDropdownLayout = ({isOpen, onSettingsClick, onLogoutClick}) => (
    <Dropdown className='user-dropdown' isOpen={isOpen}>
        <div className='user-dropdown-content'>
            <div className='user-dropdown-heading'>Account</div>

            <DropdownItem className='user-dropdown-item' onClick={onSettingsClick}>
                <SettingsIcon className='item-icon' />
                <span>Settings</span>
            </DropdownItem>

            <Separator className='user-dropdown-separator' />

            <div className='user-dropdown-heading'>Session</div>

            <DropdownItem className='user-dropdown-item' onClick={onLogoutClick}>
                <LogoutIcon className='item-icon' />
                <span>Log out</span>
            </DropdownItem>
        </div>
    </Dropdown>
);

export default UserDropdownLayout;
