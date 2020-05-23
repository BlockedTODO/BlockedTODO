const {compose, Model, snakeCaseMappers} = require('objection');
const guid = require('objection-guid');

const mixins = compose(
    guid(),
);

class BaseModel extends mixins(Model) {
    static get columnNameMappers() {
        // Set postgres column names as snake_case, but return objects with camelCase
        return snakeCaseMappers();
    }

    $beforeInsert() {
        super.$beforeInsert();
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }

    $beforeUpdate() {
        super.$beforeUpdate();
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = BaseModel;
