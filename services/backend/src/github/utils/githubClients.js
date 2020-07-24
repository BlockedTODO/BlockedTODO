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
            }
        }
    });
};

module.exports = {
    createAppClient,
    createInstallationClient,
};
