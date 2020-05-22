const findOrCreate = async (Model, params) => {
    let instance = await Model.query().findOne(params);

    if (instance) { // instance is found, return it
        return instance;
    }

    try { // instance is not found, try to create it
        return await Model.query().insert(params);
    } catch (error) {
        if (error.name && error.name === 'UniqueViolationError') { // in case there was a race condition
            return await Model.query().findOne(params);
        }
    }
};

module.exports = findOrCreate;
