'use strict';
const {generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Repository belongs to many User
        await queryInterface.createTable('UserRepositories', {
            userId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            repositoryId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            ...generateDateAttributes(Sequelize),
        });
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.dropTable('UserRepositories');
    }
};
