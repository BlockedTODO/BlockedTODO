import React from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

const Dropdown = ({className, isOpen = false, children}) => (
    isOpen && (
        <div className={classNames('dropdown', className)}>
            <div className='dropdown-content'>
                {children}
            </div>
        </div>
    )
);

export default Dropdown;
