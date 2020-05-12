/* Creates a foreign key to be used in migrations
 * It is intended to be used in cases where we want to provide a name for a foreign key
 * ie. when Model.hasMany(OtherModel) is not an option
 * example usage: `await addForeignKey(queryInterface, Sequelize)('SourceModel', 'TargetModel', 'targetIdRenamed');` */
const addForeignKey = (queryInterface, Sequelize) => async (source, target, columnName) => {
    await queryInterface.addColumn(source, columnName, {
        type: Sequelize.UUID,
        references: {
            model: target,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    });

    await queryInterface.addIndex(source, [columnName]);
};

module.exports = addForeignKey;
