import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BACKEND_URL} from 'utils/environment';

const httpLink = createHttpLink({
    uri: `${BACKEND_URL}/graphql`,
});

const authenticationLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('authentication_token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authenticationLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
