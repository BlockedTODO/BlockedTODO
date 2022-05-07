import useRestClient from './useRestClient';
import restClient from 'utils/restClient';
import useLogin from './useLogin';

const useSignup = () => {
    const {emailInput, passwordInput, login, isLoading: loginLoading, error: loginError} = useLogin();

    const signupRequest = () => restClient.post('/auth/signup', {email: emailInput.value, password: passwordInput.value});
    const {run: signup, error: signupError, isLoading: signupLoading} = useRestClient({
        deferFn: signupRequest,
        onResolve: login,
    });

    return {
        emailInput,
        passwordInput,
        signup,
        error: signupError || loginError,
        isLoading: signupLoading || loginLoading
    };
};

export default useSignup;