'use strict';
module.exports = (sequelize, DataTypes) => {
    const Repository = sequelize.define('Repository', {
        url: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'A repository with this url already exists.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isUrl: true
            }
        }
    }, {});

    Repository.associate = (models) => {
        Repository.belongsToMany(models.User, {
            through: 'UserRepositories',
            foreignKey: 'userId',
            as: 'users',
        });
        Repository.belongsToMany(models.Issue, {
            through: 'RepositoryIssues',
            foreignKey: 'issueId',
            as: 'issues',
        });
    };

    return Repository;
};
