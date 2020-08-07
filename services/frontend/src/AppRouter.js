import React, {useContext} from 'react';
import {Route, Router, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Landing, Login, NotFound, Repositories, Signup} from './scenes';
import {Header} from './components';
import {loggedInContext} from 'Store';
import {IS_PRODUCTION} from 'utils/environment';

const AppRouter = () => (
    <Router history={createBrowserHistory({forceRefresh: false})}>
        <Switch>
            <Route path='/404' component={NotFound} />
            <Route path='/login' component={Login} />
            {!IS_PRODUCTION && <Route path='/signup' component={Signup} />}
            <PrivateRoute path='/repositories' component={Repositories} />
            <Route path='/' exact={true} component={Landing} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

const LoginRedirect = ({location}) => (
    <Redirect to={{pathname: '/login', state: {from: location}}} />
);

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLoggedIn] = useContext(loggedInContext);

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
