const {createAppAuth} = require('@octokit/auth-app');

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const auth = createAppAuth({
    id: APP_ID,
    privateKey: PRIVATE_KEY,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

module.exports = auth;
