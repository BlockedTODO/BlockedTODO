const mockAddColumn = jest.fn();
const mockAddIndex = jest.fn();
const mockQueryInterface = jest.fn().mockImplementation(() => {
    return {
        addColumn: mockAddColumn,
        addIndex: mockAddIndex,
    };
});

module.exports = {
    mockQueryInterface,
    mockAddColumn,
    mockAddIndex,
};
