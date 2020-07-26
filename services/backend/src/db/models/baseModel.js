const {compose, Model, QueryBuilder, UniqueViolationError} = require('objection');
const guid = require('objection-guid');

class BaseQueryBuilder extends QueryBuilder {
    async findOrInsert(params) {
        const instance = await this.findOne(params);

        if (instance) { // instance is found, return it
            return instance;
        }

        try { // instance is not found, try to create it
            return await this.insert(params);
        } catch (error) {
            if (error instanceof UniqueViolationError) { // in case there was a race condition
                return await this.findOne(params);
            }
            throw error;
        }
    }
}

const mixins = compose(
    guid(),
);

class BaseModel extends mixins(Model) {
    static get QueryBuilder() {
        return BaseQueryBuilder;
    }

    $beforeInsert(...args) {
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
        return super.$beforeInsert(...args);
    }

    $beforeUpdate(...args) {
        this.updatedAt = new Date().toISOString();
        return super.$beforeUpdate(...args);
    }
}

module.exports = BaseModel;
