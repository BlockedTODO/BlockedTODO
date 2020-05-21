const {compose} = require('objection');
const guid = require('objection-guid');
const BaseModel = require('./baseModel');

const mixins = compose(
    guid(),
);

class Issue extends mixins(BaseModel) {
    static get tableName() {
        return 'issues';
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
        }
    }
}

module.exports = Issue;
