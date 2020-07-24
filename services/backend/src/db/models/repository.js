const BaseModel = require('./baseModel');

const REPOSITORY_HOSTS = ['github'];

class Repository extends BaseModel {
    static get tableName() {
        return 'repositories';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['host', 'hostId'],

            properties: {
                host: {type: 'string', enum: REPOSITORY_HOSTS},
                hostId: {type: 'string', minLength: 4},
                installationId: {type: 'string', minLength: 1},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'}
            }
        };
    }

    static get relationMappings() {
        const Issue = require('./issue');
        const User = require('./user');

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
    }
}

module.exports = Repository;
