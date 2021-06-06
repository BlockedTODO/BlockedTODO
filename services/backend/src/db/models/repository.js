import BaseModel from './baseModel.js';

export default class Repository extends BaseModel {
    static get tableName() {
        return 'repositories';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['nodeId'],

            properties: {
                nodeId: {type: 'string', minLength: 4},
                installationId: {type: 'integer', minimum: 0},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'}
            }
        };
    }
}
