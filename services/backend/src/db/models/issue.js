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
        Issue.belongsToMany(models.Repository, {
            through: 'RepositoryIssues',
            foreignKey: 'repositoryId',
        });
    };

    return Issue;
};
