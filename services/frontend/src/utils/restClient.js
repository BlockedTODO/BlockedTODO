import axios from 'axios';
import {BACKEND_URL} from 'utils/environment';

const restClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {'X-Trigger': 'CORS'}, // As per https://stackoverflow.com/a/8572637/7056420
});

export default restClient;
