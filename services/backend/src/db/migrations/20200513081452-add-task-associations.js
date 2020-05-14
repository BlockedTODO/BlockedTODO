'use strict';
const {addForeignKey} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);

        // Task belongs to Repository
        await foreignKeyAdder('Tasks', 'Repositories', 'repositoryId', {
            onDelete: 'CASCADE'
        });

        // Task belongs to Issue
        await foreignKeyAdder('Tasks', 'Issues', 'issueId', {
            onDelete: 'CASCADE'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'Task', // Source model
            'repositoryId' // Key we want to remove
        );
        await queryInterface.removeColumn(
            'Task',
            'issueId'
        );
    }
};
