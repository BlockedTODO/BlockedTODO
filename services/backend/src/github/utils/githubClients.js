import axios from 'axios';
import auth from '../appAuthentication.js';

export const createAppClient = async () => {
    const {token} = await auth({type: 'app'});

    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.machine-man-preview+json',
            }
        }
    });
};

export const createInstallationClient = async (installationId) => {
    const {token} = await auth({type: 'installation', installationId});

    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.machine-man-preview+json',
            }
        }
    });
};

export const createOauthClient = async (token) => {
    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.machine-man-preview+json',
            }
        }
    });
};
