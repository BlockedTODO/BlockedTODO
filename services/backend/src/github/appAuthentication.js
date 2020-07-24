const {createAppAuth} = require('@octokit/auth-app');

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');

const auth = createAppAuth({id: APP_ID, privateKey: PRIVATE_KEY});

module.exports = auth;
