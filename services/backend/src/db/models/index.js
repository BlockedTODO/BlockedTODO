import BaseModel from './baseModel.js';
import User from './user.js';
import Repository from './repository.js';
import Issue from './issue.js';
import Task from './task.js';

/* Since ECMAScript Modules can't do dynamic synchronous imports
 * and Objection.js currently doesn't support making relationMappings asynchronous,
 * the only solution to avoid require loops (circular dependencies)
 * is to import each class here, and override the relationMappings static getter from this context.
 * This means that models MUST be imported from this file, NOT their individual files in this folder. */

User.relationMappings = () => {
    return {
        repositories: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: Repository,
            join: {
                from: 'users.id',
                to: 'repositories.id',
                through: {
                    from: 'userRepositories.userId',
                    to: 'userRepositories.repositoryId',
                },
            }
        }
    };
};

Repository.relationMappings = () => {
    return {
        issues: {
            relation: BaseModel.HasManyRelation,
            modelClass: Issue,
            join: {
                from: 'repositories.id',
                to: 'issues.repositoryId',
            }
        },
        users: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: User,
            join: {
                from: 'repositories.id',
                to: 'users.id',
                through: {
                    from: 'user_repositories.repositoryId',
                    to: 'user_repositories.userId',
                },
            }
        }
    };
};

Issue.relationMappings = () => {
    return {
        repository: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Repository,
            join: {
                from: 'issues.repositoryId',
                to: 'repositories.id',
            }
        }
    };
};

Task.relationMappings = () => {
    return {
        repository: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Repository,
            join: {from: 'tasks.repositoryId', to: 'repositories.id'}
        },
        issue: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Issue,
            join: {from: 'tasks.issueId', to: 'issues.id'}
        }
    };
};

export {
    User,
    Repository,
    Issue,
    Task
};
