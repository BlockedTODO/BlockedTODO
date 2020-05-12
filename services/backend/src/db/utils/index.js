const generateId = require('./generateId');
const generateDate = require('./generateDate');
const addForeignKey = require('./addForeignKey');

module.exports = {
    ...generateId,
    ...generateDate,
    addForeignKey,
};
