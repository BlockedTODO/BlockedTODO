'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    }, {});

    Task.associate = (models) => {
        // associations can be defined here
    };

    return Task;
};
