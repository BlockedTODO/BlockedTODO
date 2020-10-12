const axios = require('axios');
const auth = require('github/appAuthentication');

const createAppClient = async () => {
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

const createInstallationClient = async (installationId) => {
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

const createOauthClient = async (token) => {
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

module.exports = {
    createAppClient,
    createInstallationClient,
    createOauthClient,
};
