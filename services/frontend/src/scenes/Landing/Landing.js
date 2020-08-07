import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Logo, Card, Separator} from 'components/';
import {loggedInContext} from 'Store';
import './Landing.scss';

/* To avoid issues with readinessProbes in GKE, the root path shouldn't redirect on regular (unauthenticated) requests
 * so we just show this landing page on requests to '/' and redirect to /repositories if the user is authenticated.
 * Details: https://cloud.google.com/kubernetes-engine/docs/concepts/ingress#limitations */
const Landing = () => {
    const [isLoggedIn] = useContext(loggedInContext);
    const history = useHistory();

    if (isLoggedIn) {
        history.push('/repositories');
    }

    return (
        <div className='landing'>
            <Logo className='landing-logo' />

            <Card className='landing-card' title='Frontend App'>
                <div className='buttons-container'>
                    <Link className='link-button' to={{pathname: 'https://blockedtodo.com'}} target='_blank'>
                        visit the official website
                    </Link>

                    <div className='or-separator'>
                        <Separator />
                        <span className='or'>OR</span>
                        <Separator />
                    </div>

                    <Link className='link-button' to='/login'>
                        log in
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Landing;
