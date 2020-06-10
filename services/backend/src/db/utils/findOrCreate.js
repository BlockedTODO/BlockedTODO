const {UniqueViolationError} = require('objection');

const findOrCreate = async (Model, params) => {
    const instance = await Model.query().findOne(params);

    if (instance) { // instance is found, return it
        return instance;
    }

    try { // instance is not found, try to create it
        return await Model.query().insert(params);
    } catch (error) {
        if (error instanceof UniqueViolationError) { // in case there was a race condition
            return await Model.query().findOne(params);
        }
        throw error;
    }
};

module.exports = findOrCreate;
