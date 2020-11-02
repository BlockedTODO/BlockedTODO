const {createAppClient, createInstallationClient, createOauthClient} = require('./githubClients');
const downloadRepository = require('./downloadRepository');
const getIssue = require('./getIssue');
const createIssue = require('./createIssue');
const getInstallationRepositories = require('./getInstallationRepositories');
const getAvatarUrl = require('./getAvatarUrl');

module.exports = {
    createAppClient,
    createInstallationClient,
    createOauthClient,
    downloadRepository,
    getIssue,
    createIssue,
    getInstallationRepositories,
    getAvatarUrl,
};
