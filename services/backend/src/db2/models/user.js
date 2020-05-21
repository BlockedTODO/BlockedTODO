const {compose} = require('objection');
const guid = require('objection-guid');
const password = require('objection-password');
const BaseModel = require('./baseModel');

const mixins = compose(
    guid(),
    password({rounds: 13}),
);

class User extends mixins(BaseModel) {
    static get tableName() {
        return 'users'
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],

            properties: {
                email: {type: 'string', format: 'email'},
                password: {type: 'string', minLength: 4, maxLength: 512},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'}
            }
        }
    }
}

module.exports = User;
