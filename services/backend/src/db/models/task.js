import BaseModel from './baseModel.js';

export default class Task extends BaseModel {
    static get tableName() {
        return 'tasks';
    }

    // Whenever a model instance is created it is checked against this schema for validation.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['nodeId'],

            properties: {
                nodeId: {type: 'string', minLength: 4},
                createdAt: {type: 'string', format: 'date-time'},
                updatedAt: {type: 'string', format: 'date-time'}
            }
        };
    }
}
