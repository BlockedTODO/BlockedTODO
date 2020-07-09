import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Landing, NotFound} from './scenes';

const AppRouter = () => (
    <Router history={createBrowserHistory({forceRefresh: false})}>
        <Switch>
            <Route path='/404' component={NotFound} />
            <Route path='/' component={Landing} exact={true} />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
);

export default AppRouter;
