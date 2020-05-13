/* Creates a date attribute definition to be used in migrations
 * It is initialized with the same structure as the defaults provided by sequelize for createdAt and updatedAt */
const generateDateDefinition = (Sequelize) => {
    return {
        type: Sequelize.DATE,
        allowNull: false,
    };
};

/* Creates createdAt and updatedAt attribute key/value pairs to be used in migrations
 * It is initialized with the same structure as the defaults provided by the sequelize CLI
 * It will typically be used with the spread operator in an object ie. `...generateDateAttributes(Sequelize)` */
const generateDateAttributes = (Sequelize) => {
    return {
        createdAt: generateDateDefinition(Sequelize),
        updatedAt: generateDateDefinition(Sequelize),
    };
};

module.exports = {
    generateDateDefinition,
    generateDateAttributes,
};
