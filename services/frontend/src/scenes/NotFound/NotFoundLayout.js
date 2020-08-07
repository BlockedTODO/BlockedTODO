import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.scss';

const NotFoundLayout = () => (
    <div className='not-found'>
        <h1>404 Not Found</h1>
        Consider refreshing or go <Link to='/repositories'>back to home</Link>
    </div>
);

export default NotFoundLayout;
