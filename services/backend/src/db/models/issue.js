'use strict';
module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
        url: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'An issue with this url already exists.',
                fields: [sequelize.fn('lower', sequelize.col('url'))]
            },
            validate: {
                isUrl: true
            }
        }
    }, {});

    Issue.associate = (models) => {
        Issue.belongsToMany(models.Repository, {
            through: 'RepositoryIssues',
            foreignKey: 'issueId',
            as: 'repositories',
        });
    };

    return Issue;
};
