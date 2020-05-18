import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Login, Repositories} from './scenes';
import './App.scss';

const App = () => (
    <div id='app'>
        <Router history={createBrowserHistory({forceRefresh: false})}>
            <Switch>
                <Route path='/login' component={Login} />
                <PrivateRoute path='/repositories' component={Repositories} />
                <PrivateRoute path='*' component={Repositories} />
            </Switch>
        </Router>
    </div>
);

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}} />
);

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = false; // TODO: replace this with logged in logic

    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props} /> : <LoginRedirect {...props} />}
        />
    );
}

export default App;
