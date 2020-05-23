const {compose} = require('objection');
const guid = require('objection-guid');
const BaseModel = require('./baseModel');

const mixins = compose(
    guid(),
);

class Repository extends mixins(BaseModel) {
    static get tableName() {
        return 'repositories';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['url'],

            properties: {
                url: {type: 'string', format: 'uri'},
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
                relation: BaseModel.ManyToManyRelation,
                modelClass: Issue,
                join: {
                    from: 'repositories.id',
                    to: 'issues.id',
                    through: {
                        from: 'repository_issues.repository_id',
                        to: 'repository_issues.issue_id',
                    },
                }
            },
            users: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'repositories.id',
                    to: 'users.id',
                    through: {
                        from: 'user_repositories.repository_id',
                        to: 'user_repositories.user_id',
                    },
                }
            }
        };
    }
}

module.exports = Repository;
