import React from 'react';
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

const Store = ({children}) => (
    <LoggedInProvider>
        <GraphqlProvider>
            {children}
        </GraphqlProvider>
    </LoggedInProvider>
);

export default Store;
