import React from 'react';
import classNames from 'classnames';
import './Separator.scss';

const Separator = ({className}) => (
    <div className={classNames('separator', className)} />
);

export default Separator;
