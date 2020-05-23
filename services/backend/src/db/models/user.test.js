const {transactionPerTest} = require('objection-transactional-tests');
const User = require('./user');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

describe('insert', () => {
    it('is given an id automatically', async () => {
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1'});
        expect(user).toHaveProperty('id');
        expect(user.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1'});
        expect(user).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('does not store the password in plaintext', async () => {
        const password = 'hunter1';
        const user = await User.query().insert({email: 'test@test.com', password: password});
        expect(user.password).not.toEqual(password);
    });

    it('does not permit duplicate email addresses', async () => {
        const insertQuery = User.query().insert({email: 'test@test.com', password: 'hunter1'});
        await insertQuery; // First creation is a success
        await expect(insertQuery).rejects.toThrowError(); // Second creation fails
    });

    it('does not permit passwords with less than 4 characters', async () => {
        const insertQuery = User.query().insert({email: 'test@test.com', password: 'dom'});
        await expect(insertQuery).rejects.toThrowError();
    });
});
