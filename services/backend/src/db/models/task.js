const BaseModel = require('./baseModel');

const TASK_HOSTS = ['github'];

class Task extends BaseModel {
    static get tableName() {
        return 'tasks';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['host', 'hostId'],

            properties: {
                host: {type: 'string', enum: TASK_HOSTS},
                hostId: {type: 'string', minLength: 4},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const Repository = require('./repository');
        const Issue = require('./issue');

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
    }
}

module.exports = Task;
