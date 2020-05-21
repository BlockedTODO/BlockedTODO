const {Model, snakeCaseMappers} = require('objection');

class BaseModel extends Model {
    static get columnNameMappers() {
        // Set postgres column names as snake_case, but return objects with camelCase
        return snakeCaseMappers();
    }

    $beforeInsert() {
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = BaseModel;
