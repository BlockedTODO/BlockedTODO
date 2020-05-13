'use strict';
const {generateIdAttribute, generateDateAttributes} = require('db/utils/migrationHelpers');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            ...generateIdAttribute(Sequelize),
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: { // Hashed and salted password
                type: Sequelize.STRING,
                allowNull: false,
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...generateDateAttributes(Sequelize),
        });
    },
    down: (queryInterface, _Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
