'use strict';
const {addForeignKey} = require('db/utils/migrationHelpers');

// add-associations
module.exports = {
    up: async (queryInterface, Sequelize) => {
      const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);

      // Task belongs to Repository
      await foreignKeyAdder('Task', 'Repository', 'repositoryId', {onDelete: 'CASCADE'});

      // Task belongs to Issue
      await foreignKeyAdder('Task', 'Issue', 'issueId', {onDelete: 'CASCADE'});
    },

    down: async (queryInterface, _Sequelize) => {
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
