import axios from 'axios';
import {BACKEND_URL} from 'utils/environment';
import {useContext} from 'react';
import {loggedInContext} from 'Store';

const restClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {'X-Trigger': 'CORS'}, // As per https://stackoverflow.com/a/8572637/7056420
});

const unauthorizedInterceptor = (error) => {
    //const setIsLoggedIn = useContext(loggedInContext)[1];
    if (error.config && error?.response?.status === 401) {
        console.log('UNAUTHORIZED!!!1!');
        //setIsLoggedIn(false);
    }
};

restClient.interceptors.response.use(null, unauthorizedInterceptor);

export default restClient;
