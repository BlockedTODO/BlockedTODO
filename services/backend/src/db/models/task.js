'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        url: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'A task with this url already exists.',
                fields: [sequelize.fn('lower', sequelize.col('url'))]
            },
            validate: {
                isUrl: true
            }
        },
        repositoryId: DataTypes.UUID,
        issueId: DataTypes.UUID,
    }, {});

    Task.associate = (models) => {
        // Delete/update related tasks if attached repository or issue is deleted/updated
        Task.belongsTo(models.Repository, {
            foreignKey: {
                name: 'repositoryId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Task.belongsTo(models.Issue, {
            foreignKey: {
                name: 'issueId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    return Task;
};
