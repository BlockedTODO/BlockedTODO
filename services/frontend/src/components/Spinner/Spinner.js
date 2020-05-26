import React from 'react';
import classNames from 'classnames';
import './Spinner.scss';

const Spinner = ({className}) => (
    /* Inspired by https://codepen.io/jczimm/pen/vEBpoL */
    <div className={classNames('spinner', className)}>
        <svg className='circle' viewBox='25 25 50 50'>
            <circle
                className='path'
                cx='50'
                cy='50'
                r='20'
                fill='none'
                strokeWidth='8'
                strokeMiterlimit='10'
            />
        </svg>
    </div>
);

export default Spinner;
