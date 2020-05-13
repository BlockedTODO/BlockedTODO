const {generateDateDefinition, generateDateAttributes} = require('./generateDate');
const Sequelize = require('sequelize');

const expectedStructure = {
    type: Sequelize.DATE,
    allowNull: false,
};

describe('generateDateDefinition', () => {
    it('generates date definition', () => {
        expect(generateDateDefinition(Sequelize)).toMatchObject(expectedStructure);
    });
});

describe('generateDateAttributes', () => {
    it('generates date attributes', () => {
        const expectedAttributes = {
            createdAt: expectedStructure,
            updatedAt: expectedStructure,
        };
        expect(generateDateAttributes(Sequelize)).toMatchObject(expectedAttributes);
    });
});
