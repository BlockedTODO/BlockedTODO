const {generateIdDefinition, generateIdAttribute} = require('./generateId');
const Sequelize = require('sequelize');

const expectedStructure = {
    type: Sequelize.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    allowNull: false,
    autoIncrement: false,
    primaryKey: true
};

describe('generateIdDefinition', () => {
    it('generates id definition', () => {
        expect(generateIdDefinition(Sequelize)).toMatchObject(expectedStructure);
    });
});

describe('generateIdAttribute', () => {
    it('generates id attribute', () => {
        expect(generateIdAttribute(Sequelize)).toMatchObject({id: expectedStructure});
    });
})
