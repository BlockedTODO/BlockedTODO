import React from 'react';
import {Link} from 'react-router-dom';
import {ToDoIcon} from 'assets/icons';
import './Logo.scss';

const Logo = ({route = '/'}) => (
    <Link className='logo-container' to={route}>
        <ToDoIcon className='logo-icon' />
        <h3> {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <code className='logo-text'>// BlockedTODO</code>
        </h3>
    </Link>
);

export default Logo;
