const {userQueries, userMutations} = require('./users');
const {repositoryQueries, repositoryMutations} = require('./repositories');
const {issueQueries, issueMutations} = require('./issues');
const {taskQueries, taskMutations} = require('./tasks');
const {authenticationQueries} = require('./authentication');

module.exports = {
    User: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    Repository: {
        users: (parent, args, context, info) => parent.getUsers(),
        issues: (parent, args, context, info) => parent.getIssues(),
    },
    Issue: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    Task: {
        repository: (parent, args, context, info) => parent.getRepository(),
        issue: (parent, args, context, info) => parent.getIssue(),
    },
    RootQuery: {
        ...userQueries,
        ...repositoryQueries,
        ...issueQueries,
        ...taskQueries,
        ...authenticationQueries,
    },
    RootMutation: {
        ...userMutations,
        ...repositoryMutations,
        ...issueMutations,
        ...taskMutations,
    }
};
