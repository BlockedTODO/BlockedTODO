import {useContext} from 'react';
import {useAsync} from 'react-async';
import {loggedInContext} from 'Store';

// Rest client hook to interact with the backend.
const useRestClient = (options) => {
    const setIsLoggedIn = useContext(loggedInContext)[1];

    const onRequest = async () => {
        let response;
        try {
            response = await options.deferFn();
            return response;
        } catch (error) {
            if (error?.response?.status === 401) {
                setIsLoggedIn(false);
            }
            throw error.message;
        }
    };

    return useAsync({...options, deferFn: onRequest});
};

export default useRestClient;
