import {useHistory} from 'react-router-dom';
import {useApolloClient, useLazyQuery} from '@apollo/client';
import {loginQuery} from 'graphql/operations/';

const useLogin = ({onSuccess = () => {}, onError = () => {}}) => {
    const client = useApolloClient();
    const history = useHistory();

    /* The current login implementation is secure but offers a poor user experience.
     * Sessions are not persisted on refresh because we store the authentication token in memory via the apollo in-memory store.
     * TODO: Follow the instructions here: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#intro */
    const onLogin = ({login}) => {
        onSuccess();
        client.writeData({data: {authentication_token: login.token}});
        history.push('/');
    };

    return useLazyQuery(loginQuery, {
        onCompleted: onLogin,
        onError: onError,
    });
};

export default useLogin;
