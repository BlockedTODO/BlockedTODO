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
        //Repository.belongsToMany(models.User);
        Repository.belongsToMany(models.Issue, {
            through: 'RepositoryIssues',
            foreignKey: 'issueId',
        });
    };

    return Repository;
};
