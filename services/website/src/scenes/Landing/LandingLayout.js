import React from 'react';
import {Link} from 'react-router-dom';
import {Logo, Button} from 'components/';
import './Landing.scss';

const LandingLayout = () => (
    <div className='landing'>
        <Logo className='landing-logo' />
        <div className='buttons-container'>
            <Link to={{pathname: 'https://github.com/apps/blockedtodo'}} target='_blank'>
                <Button className='link-button' label='Install the GitHub App' />
            </Link>
            <Link to={{pathname: 'https://github.com/BlockedTODO/BlockedTODO/blob/master/README.md'}} target='_blank'>
                <Button className='link-button' label='More Information' />
            </Link>
        </div>
    </div>
);

export default LandingLayout;
