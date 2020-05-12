/* Creates a uuid attribute definition to be used in migrations
 * It is initialized with values such that it defaults to a uuidv4 in postgres
 * Note: this requires the uuid-ossp postgres extension (which should be added in a migration) */
const generateIdDefinition = (Sequelize) => {
    return {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
    }
};

/* Create id attribute key/value pair to be used in migrations
 * It is initialized with a value that defaults to a uuidv4 in postgres
 * It will typically be used with the spread operator in an object ie. `...generateIdAttribute(Sequelize)` */
const generateIdAttribute = (Sequelize) => {
    return {id: generateIdDefinition(Sequelize)}
};

module.exports = {
    generateIdDefinition,
    generateIdAttribute,
};
