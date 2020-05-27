import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Login, NotFound, Repositories} from './scenes';
import {Header} from './components';

const AppRouter = () => (
    <Router history={createBrowserHistory({forceRefresh: false})}>
        <Switch>
            <Route path='/404' component={NotFound} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/repositories' component={Repositories} />
            <Redirect from='/' to='/repositories' exact />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
);

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}} />
);

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = true; // TODO: replace this with logged in logic

    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn ? (
                    <React.Fragment>
                        <Header />
                        <Component {...props} />
                    </React.Fragment>
                ) : (
                    <LoginRedirect {...props} />
                )
            )}
        />
    );
}

export default AppRouter;
