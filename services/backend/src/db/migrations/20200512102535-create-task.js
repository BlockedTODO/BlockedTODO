'use strict';
const {generateIdAttribute, generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tasks', {
            ...generateIdAttribute(Sequelize),
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...generateDateAttributes(Sequelize),
        });

        await queryInterface.addIndex('Tasks', ['url']);
    },
    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable('Tasks');
    }
};
