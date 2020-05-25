import React from 'react';
import {Link} from 'react-router-dom';
import {ToDoIcon} from 'assets/icons';
import './Logo.scss';

const Logo = ({route = '/'}) => (
    <Link to={route}>
        <div class='logo-container'>
            <ToDoIcon className='logo-icon' />
            <h2> {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <code className='logo-text'>// BlockedTODO</code>
            </h2>
        </div>
    </Link>
);

export default Logo;
