import React, {useState} from 'react';
import {ApolloProvider} from '@apollo/client';
import {useGraphqlClient, useIsLoggedIn} from 'hooks/';

export const loggedInContext = React.createContext();
const LoggedInProvider = ({children}) => (
    <loggedInContext.Provider value={useIsLoggedIn()}>
        {children}
    </loggedInContext.Provider>
);

const GraphqlProvider = ({children}) => (
    <ApolloProvider client={useGraphqlClient()}>
        {children}
    </ApolloProvider>
);

export const userContext = React.createContext();
const UserProvider = ({children}) => (
    <userContext.Provider value={useState(null)}>
        {children}
    </userContext.Provider>
);

const Store = ({children}) => (
    <LoggedInProvider>
        <GraphqlProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </GraphqlProvider>
    </LoggedInProvider>
);

export default Store;
