'use strict';
const {generateIdAttribute, generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Repositories', {
            ...generateIdAttribute(Sequelize),
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...generateDateAttributes(Sequelize),
        });

        await queryInterface.addIndex('Repositories', ['url']);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Repositories');
    }
};
