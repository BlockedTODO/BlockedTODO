/* Migration helpers are suitable for use in migration files.
 * The code in these helpers should not contain any references to hardcoded table/column names
 * and should not change significantly over time because it risks causing discrepancies between
 * existing and new environments */
const generateId = require('./generateId');
const generateDate = require('./generateDate');
const addForeignKey = require('./addForeignKey');

module.exports = {
    ...generateId,
    ...generateDate,
    addForeignKey,
};
