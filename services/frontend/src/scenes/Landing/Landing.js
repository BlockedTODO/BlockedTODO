import React, {useContext} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Logo, Card, Separator} from 'components/';
import {loggedInContext} from 'Store';
import './Landing.scss';

/* To avoid issues with readinessProbes in GKE, the root path shouldn't redirect on regular (unauthenticated) requests
 * so we just show this landing page on requests to '/' and redirect to /repositories if the user is authenticated.
 * Details: https://cloud.google.com/kubernetes-engine/docs/concepts/ingress#limitations */
const Landing = ({location}) => {
    const [isLoggedIn] = useContext(loggedInContext);

    return (
        isLoggedIn ? (
            <Navigate to='/repositories' state={{from: location}} replace={true} />
        ) : (
            <div className='landing'>
                <Logo className='landing-logo' />

                <Card className='landing-card' title='Frontend App'>
                    <div className='buttons-container'>
                        <a className='link-button' href='https://blockedtodo.com' rel='noreferrer' target='_blank'>
                            visit the official website
                        </a>

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
        )
    );
};

export default Landing;
