import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import AppRouter from './AppRouter';
import client from './graphql/client';
import './App.scss';

const App = () => (
    <div id='app'>
        <ApolloProvider client={client}>
            <AppRouter />
        </ApolloProvider>
    </div>
);

export default App;
