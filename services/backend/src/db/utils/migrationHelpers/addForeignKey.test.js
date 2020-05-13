const addForeignKey = require('./addForeignKey');
const {mockQueryInterface, mockAddColumn, mockAddIndex} = require('test/mocks/queryInterface');
const Sequelize = require('sequelize');

const expectedStructure = (target) => {
    return {
        type: Sequelize.UUID,
        references: {
            model: target,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    };
};

describe('addForeignKey', () => {
    it('adds column on the source', async () => {
        await addForeignKey(mockQueryInterface(), Sequelize)('SourceModel', 'TargetModel', 'targetIdRenamed');
        expect(mockAddColumn).toHaveBeenCalledTimes(1);
    });

    it('adds column with the correct properties', async () => {
        await addForeignKey(mockQueryInterface(), Sequelize)('SourceModel', 'TargetModel', 'targetIdRenamed');
        expect(mockAddColumn).toHaveBeenCalledWith('SourceModel', 'targetIdRenamed', expectedStructure('TargetModel'));
    });

    it('adds an index on the source', async () => {
        await addForeignKey(mockQueryInterface(), Sequelize)('SourceModel', 'TargetModel', 'targetIdRenamed');
        expect(mockAddIndex).toHaveBeenCalledTimes(1);
    });

    it('adds an index with the correct name', async () => {
        await addForeignKey(mockQueryInterface(), Sequelize)('SourceModel', 'TargetModel', 'targetIdRenamed');
        expect(mockAddIndex).toHaveBeenCalledWith('SourceModel', ['targetIdRenamed']);
    });
});
