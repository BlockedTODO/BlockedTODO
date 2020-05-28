import React from 'react';
import AppRouter from './AppRouter';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import './App.scss';

const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;
const host = process.env.REACT_APP_BACKEND_HOST;
const port = process.env.REACT_APP_BACKEND_PORT;

const client = new ApolloClient({
    uri: `${protocol}://${host}:${port}/graphql`,
});

const App = () => (
    <div id='app'>
        <ApolloProvider client={client}>
            <AppRouter />
        </ApolloProvider>
    </div>
);

export default App;
