'use strict';
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    }, {});

    Issue.associate = (models) => {
        // associations can be defined here
    };

    return Issue;
};
