import {useState, useEffect, useCallback} from 'react';
import restClient from 'utils/restClient';

/* State hook for isLoggedIn global state.
 * Since we use http-only cookies for sessions, we can't directly
 * check if a session is active without making a request to the backend.
 * So we have to keep track of whether we were previously logged in to populate the default state.
 * We then call the backend to verify authentication on every re-render (TODO: move that part here)*/
const useIsLoggedIn = () => {
    // Get the initial "logged in" state from localStorage
    const initialState = localStorage.getItem('isLoggedIn') === 'true';

    const [isLoggedIn, setIsLoggedIn] = useState(initialState);

    const setIsLoggedInWrapper = useCallback((value) => {
        localStorage.isLoggedIn = value; // Set value in localStorage
        setIsLoggedIn(value); // Change the state
    }, []);

    useEffect(() => { // Verify authentication on every re-render (page refresh)
        const checkAuthStatus = async () => {
            try {
                const response = await restClient.get('/auth/status');
                setIsLoggedInWrapper(response.data.isLoggedIn);
            } catch (error) {
                return;
            }
        };

        checkAuthStatus(); // useEffect is synchronous so we don't await this call
    }, [setIsLoggedInWrapper]);

    return [isLoggedIn, setIsLoggedInWrapper];
};

export default useIsLoggedIn;
