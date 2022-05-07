import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import useInput from './useInput';
import useRestClient from './useRestClient';
import {loggedInContext} from 'Store';
import restClient from 'utils/restClient';

const useLogin = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const history = useHistory();
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const loginRequest = () => restClient.post('/auth/login', {
        email: emailInput.value,
        password: passwordInput.value
    });

    const {run: login, error, isLoading} = useRestClient({
        deferFn: loginRequest,
        onResolve: () => {
            setIsLoggedIn(true);
            history.push('/repositories');
        }
    });

    return {emailInput, passwordInput, login, error, isLoading};
};

export default useLogin;
