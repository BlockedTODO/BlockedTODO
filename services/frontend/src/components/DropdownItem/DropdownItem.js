import React from 'react';
import classNames from 'classnames';
import './DropdownItem.scss';

const DropdownItem = ({className, children, onClick, ...otherProps}) => (
    <button
        className={classNames('dropdown-item', className)}
        onClick={onClick}
        {...otherProps}
    >
        {children}
    </button>
);

export default DropdownItem;
