'use strict';
module.exports = (sequelize, DataTypes) => {
    const Repository = sequelize.define('Repository', {
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    }, {});

    Repository.associate = (models) => {
        // associations can be defined here
    };

    return Repository;
};
