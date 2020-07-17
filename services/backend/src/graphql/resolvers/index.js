const {userQueries, userMutations} = require('./users');
const {repositoryQueries, repositoryMutations} = require('./repositories');
const {issueQueries, issueMutations} = require('./issues');
const {taskQueries, taskMutations} = require('./tasks');
const {authenticationQueries} = require('./authentication');

module.exports = {
    User: {
        repositories: (parent, args, context, info) => parent.$relatedQuery('repositories')
    },
    Repository: {
        users: (parent, args, context, info) => parent.$relatedQuery('users'),
        issues: (parent, args, context, info) => parent.$relatedQuery('issues'),
    },
    Issue: {
        repository: (parent, args, context, info) => parent.$relatedQuery('repository')
    },
    Task: {
        repository: (parent, args, context, info) => parent.$relatedQuery('repository'),
        issue: (parent, args, context, info) => parent.$relatedQuery('issue'),
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
