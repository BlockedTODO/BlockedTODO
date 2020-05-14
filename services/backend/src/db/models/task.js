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
        // Delete/update related tasks if attached repository or issue is deleted/updated
        Task.belongsTo(models.Repository, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
        Task.belongsTo(models.Issue, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    };

    return Task;
};
