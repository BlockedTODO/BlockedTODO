import React from 'react';
import classNames from 'classnames';
import './FormError.scss';

const FormError = ({className, message = ''}) => (
    <div
        className={classNames(
            'form-error',
            {'form-error--visible': message},
            className
        )}
    >
        {message}
    </div>
);

export default FormError;
