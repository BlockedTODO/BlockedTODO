const {App: OctokitApp} = require('@octokit/app');

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');;

const app = new OctokitApp({id: APP_ID, privateKey: PRIVATE_KEY});

module.exports = app;
