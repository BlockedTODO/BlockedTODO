import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Login} from './scenes';
import './App.scss';

const App = () => (
    <div id='app'>
        <Router history={createBrowserHistory({forceRefresh: false})}>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='*' component={LoginRedirect} />
            </Switch>
        </Router>
    </div>
);

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}} />
);

export default App;
