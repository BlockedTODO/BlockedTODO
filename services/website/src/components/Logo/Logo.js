import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {ToDoIcon} from 'assets/icons';
import './Logo.scss';

const Logo = ({className, route = '/'}) => (
    <Link className={classNames('logo-container', className)} to={route}>
        <ToDoIcon className='logo-icon' />
        <h3> {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <code className='logo-text'>// BlockedTODO</code>
        </h3>
    </Link>
);

export default Logo;
