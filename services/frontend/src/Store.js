import React from 'react';
import {useIsLoggedIn} from 'hooks/';

export const loggedInContext = React.createContext();

const LoggedInProvider = ({children}) => (
    <loggedInContext.Provider value={useIsLoggedIn()}>
        {children}
    </loggedInContext.Provider>
);

const Store = ({children}) => (
    <LoggedInProvider>
        {children}
    </LoggedInProvider>
);

export default Store;
