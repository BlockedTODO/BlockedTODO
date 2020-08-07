import React from 'react';
import classNames from 'classnames';
import {Separator, FormError} from 'components/';
import './Card.scss';

const Card = ({className, title, errorMessage, children}) => (
    <div className={classNames('card', className)}>
        <h1 className='card-section'>{title}</h1>

        <Separator />
        <FormError message={errorMessage} />

        <div className='card-section'>
            {children}
        </div>
    </div>
);

export default Card;
