import {useContext} from 'react';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {loggedInContext} from 'Store';
import {BACKEND_URL} from 'utils/environment';

/* State hook to create a graphql client connected to the global state.
 * This is used in the store. */
const useGraphqlClient = () => {
    const setIsLoggedIn = useContext(loggedInContext)[1];

    // Log out on the client side when a request returns a 401: Unauthorized
    const errorLink = onError(({operation}) => {
        // Raw response set by apollo-link-http
        const {response} = operation.getContext();

        if (response.status === 401) {
            setIsLoggedIn(false);
        }
    });

    const httpLink = createHttpLink({
        uri: `${BACKEND_URL}/graphql`,
    });

    const client = new ApolloClient({
        link: ApolloLink.from([
            errorLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
    });

    return client;
};

export default useGraphqlClient;
