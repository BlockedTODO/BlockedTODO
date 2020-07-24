const axios = require('axios');
const app = require('github/app');

const createAppClient = async () => {
    const token = await app.getSignedJsonWebToken();

    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    });
}

const createInstallationClient = async (installationId) => {
    const token = await app.getInstallationAccessToken({installationId});

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
