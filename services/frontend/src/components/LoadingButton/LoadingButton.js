import React from 'react';
import classNames from 'classnames';
import {Spinner} from 'components/';
import './LoadingButton.scss';

const LoadingButton = ({className, label = '', isLoading = false, onClick, labelClass, ...otherProps}) => (
    <button
        className={classNames('loading-button', className)}
        onClick={onClick}
        disabled={isLoading}
        {...otherProps}
    >
        {
            isLoading ? (
                <Spinner />
            ) : (
                <span className='label'>{label}</span>
            )
        }
    </button>
);

export default LoadingButton;
