'use strict';
const {generateIdAttribute, generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Issues', {
            ...generateIdAttribute(Sequelize),
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...generateDateAttributes(Sequelize),
        });

        await queryInterface.addIndex('Issues', ['url']);
    },
    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable('Issues');
    }
};
