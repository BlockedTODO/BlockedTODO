const {createInstallationClient, createAppClient} = require('./githubClients');
const downloadRepository = require('./downloadRepository');
const getIssue = require('./getIssue');
const createIssue = require('./createIssue');

module.exports = {
    createInstallationClient,
    createAppClient,
    downloadRepository,
    getIssue,
    createIssue,
};
