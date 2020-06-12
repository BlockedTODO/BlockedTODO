const createAppClient = require('./axiosWrapper');
const downloadRepository = require('./downloadRepository');
const downloadAndScan = require('./downloadAndScan');
const getIssue = require('./getIssue');
const createIssue = require('./createIssue');

module.exports = {
    createAppClient,
    downloadRepository,
    downloadAndScan,
    getIssue,
    createIssue,
};
