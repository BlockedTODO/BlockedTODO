'use strict';
module.exports = (sequelize, DataTypes) => {
    const Repository = sequelize.define('Repository', {
        url: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'A repository with this url already exists.',
                fields: [sequelize.fn('lower', sequelize.col('url'))]
            },
            validate: {
                isUrl: true
            }
        }
    }, {});

    Repository.associate = (models) => {
        Repository.belongsToMany(models.User, {
            through: 'UserRepositories',
            foreignKey: 'repositoryId',
            as: 'users',
        });
        Repository.belongsToMany(models.Issue, {
            through: 'RepositoryIssues',
            foreignKey: 'repositoryId',
            as: 'issues',
        });
    };

    return Repository;
};
