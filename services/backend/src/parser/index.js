const parseCodebase = require('./parseCodebase');
const {createMissingIssues, deleteUnreferencedIssues} = require('./issueHandler');
const {createMissingTasks} = require('./taskHandler');
const scanCodebase = require('./scanCodebase');

module.exports = {
    parseCodebase,
    createMissingIssues,
    deleteUnreferencedIssues,
    createMissingTasks,
    scanCodebase,
};
