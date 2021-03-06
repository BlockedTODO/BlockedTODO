import React from 'react';
import classNames from 'classnames';
import {BACKEND_URL} from 'utils/environment';
import {GithubIcon} from 'assets/icons/';
import './GithubLoginButton.scss';

const GithubLoginButton = ({className, label = 'Log in with GitHub'}) => (
    /* We use an href instead of something like a LoadingButton with an onClick handler
     * because GitHub's backend does not support CORS.
     *
     * See this answer for a detailed explanation of the issue:
     * https://github.com/auth0/passport-linkedin-oauth2/issues/43#issuecomment-378115816
     *
     * The downside of this is that we can't have an onSuccess callback that updates the global isLoggedIn state,
     * so we have to rely on the useIsLoggedIn store hook that verifies authentication on every re-render (page refresh) */
    <a className={classNames('github-login-button', className)} href={`${BACKEND_URL}/auth/github`}>
        <GithubIcon className='github-icon' />
        <span className='label'>{label}</span>
    </a>
);

export default GithubLoginButton;
