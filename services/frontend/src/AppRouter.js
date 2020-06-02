import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {useApolloClient} from '@apollo/react-hooks';
import {createBrowserHistory} from 'history';
import {Login, NotFound, Repositories, Signup} from './scenes';
import {Header} from './components';

const AppRouter = () => (
    <Router history={createBrowserHistory({forceRefresh: false})}>
        <Switch>
            <Route path='/404' component={NotFound} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute path='/repositories' component={Repositories} />
            <Redirect from='/' to='/repositories' exact={true} />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
);

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}} />
);

const PrivateRoute = ({component: Component, ...rest}) => {
    const client = useApolloClient();
    const isLoggedIn = client.cache.data.data.ROOT_QUERY?.authentication_token;

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
};

export default AppRouter;
