import axios from 'axios';
import {BACKEND_URL} from 'utils/environment';

const restClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

export default restClient;
