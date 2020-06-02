import {useHistory} from 'react-router-dom';
import {useLazyQuery} from '@apollo/react-hooks';
import {loginQuery} from 'graphql/operations/';

const useLogin = ({onSuccess = () => {}, onError = () => {}}) => {
    const history = useHistory();

    /* FIXME: the current login implementation still has some vulnerabilities that need to be fixed before a full release.
    * Follow the instructions here: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#intro */
    const onLogin = ({login}) => {
        onSuccess();
        localStorage.setItem('authentication_token', login.token);
        history.push('/');
    }

    return useLazyQuery(loginQuery, {
        onCompleted: onLogin,
        onError: onError,
    });
};

export default useLogin;
