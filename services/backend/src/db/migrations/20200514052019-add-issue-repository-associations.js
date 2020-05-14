'use strict';
const {generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Issue belongs to many Repository
        await queryInterface.createTable('RepositoryIssues', {
            repositoryId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            issueId: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            ...generateDateAttributes(Sequelize),
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('RepositoryIssues');
    }
};
