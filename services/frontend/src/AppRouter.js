import React, {useContext} from 'react';
import {Route, BrowserRouter, Navigate, Routes} from 'react-router-dom';
import {Landing, Login, NotFound, Repositories, Signup} from './scenes';
import {Header} from './components';
import {loggedInContext} from 'Store';
import {IS_PRODUCTION} from 'utils/environment';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/login' element={<Login />} />
            {!IS_PRODUCTION && <Route path='/signup' element={<Signup />} />}
            <Route path='/repositories' element={<RequireAuth><Repositories /></RequireAuth>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

const LoginRedirect = ({location}) => (
    <Navigate to='/login' state={{from: location}} replace={true} />
);

const RequireAuth = ({children, ...props}) => {
    const [isLoggedIn] = useContext(loggedInContext);

    if (!isLoggedIn) {
        return <LoginRedirect {...props} />;
    }

    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default AppRouter;
