import {userQueries, userMutations} from './users.js';
import {repositoryQueries, repositoryMutations} from './repositories.js';
import {issueQueries, issueMutations} from './issues.js';
import {taskQueries, taskMutations} from './tasks.js';

const resolvers = {
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
    },
    RootMutation: {
        ...userMutations,
        ...repositoryMutations,
        ...issueMutations,
        ...taskMutations,
    }
};

export default resolvers;
