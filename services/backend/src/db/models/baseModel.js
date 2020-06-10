const {compose, Model} = require('objection');
const guid = require('objection-guid');

const mixins = compose(
    guid(),
);

class BaseModel extends mixins(Model) {
    $beforeInsert(...args) {
        super.$beforeInsert(...args);
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }

    $beforeUpdate(...args) {
        super.$beforeUpdate(...args);
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = BaseModel;
