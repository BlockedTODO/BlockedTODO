import {transactionPerTest} from 'objection-transactional-tests';
import knex, {User} from '../index.js';

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
});

describe('insert', () => {
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

    it('encrypts access tokens', async () => {
        const accessToken = 'hello';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', accessToken});

        expect(user.accessToken).not.toEqual(accessToken);
        expect(user).toMatchObject({
            accessToken: expect.any(String),
            accessTokenIv: expect.any(String),
        });
    });

    it('encrypts refresh tokens', async () => {
        const refreshToken = 'world';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', refreshToken});

        expect(user.refreshToken).not.toEqual(refreshToken);
        expect(user).toMatchObject({
            refreshToken: expect.any(String),
            refreshTokenIv: expect.any(String),
        });
    });
});

describe('patch', () => {
    it('encrypts access tokens', async () => {
        const user = await User.query().findOne({});
        const accessToken = 'hello';

        await user.$query().patch({accessToken});

        expect(user.accessToken).not.toEqual(accessToken);
        expect(user).toMatchObject({
            accessToken: expect.any(String),
            accessTokenIv: expect.any(String),
        });
    });

    it('encrypts refresh tokens', async () => {
        const user = await User.query().findOne({});
        const refreshToken = 'world';

        await user.$query().patch({refreshToken});

        expect(user.refreshToken).not.toEqual(refreshToken);
        expect(user).toMatchObject({
            refreshToken: expect.any(String),
            refreshTokenIv: expect.any(String),
        });
    });

    it('replaces existing access tokens and encrypts new ones', async () => {
        const oldAccessToken = 'accessToken';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', accessToken: oldAccessToken});
        const oldEncryptedAccessToken = user.accessToken;

        const newAccessToken = 'hello';
        await user.$query().patch({accessToken: newAccessToken});

        // Validate structure
        expect(user).toMatchObject({
            accessToken: expect.any(String),
            accessTokenIv: expect.any(String),
        });

        // Validate tokens replaced
        expect(user.accessToken).not.toEqual(oldAccessToken);
        expect(user.accessToken).not.toEqual(oldEncryptedAccessToken);

        // Validate tokens encrypted
        expect(user.accessToken).not.toEqual(newAccessToken);
    });

    it('replaces existing refresh tokens and encrypts new ones', async () => {
        const oldRefreshToken = 'refreshToken';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', refreshToken: oldRefreshToken});
        const oldEncryptedRefreshToken = user.refreshToken;

        const newRefreshToken = 'world';
        await user.$query().patch({refreshToken: newRefreshToken});

        // Validate structure
        expect(user).toMatchObject({
            refreshToken: expect.any(String),
            refreshTokenIv: expect.any(String),
        });

        // Validate tokens replaced
        expect(user.refreshToken).not.toEqual(oldRefreshToken);
        expect(user.refreshToken).not.toEqual(oldEncryptedRefreshToken);

        // Validate tokens encrypted
        expect(user.refreshToken).not.toEqual(newRefreshToken);
    });
});

describe('verifyPassword', () => {
    it('returns true when it receives a valid password', async () => {
        const password = 'hunter1';
        const user = await User.query().insert({email: 'test@test.com', password: password});
        expect(await user.verifyPassword(password)).toBe(true);
    });

    it('returns false when it receives an invalid password', async () => {
        const password = 'hunter1';
        const user = await User.query().insert({email: 'test@test.com', password: password});
        expect(await user.verifyPassword('invalidPassword')).toBe(false);
    });
});

describe('decryptTokens', () => {
    it('decrypts tokens', async () => {
        const accessToken = 'hello';
        const refreshToken = 'world';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', accessToken, refreshToken});

        expect(user.decryptTokens()).toMatchObject({accessToken, refreshToken});
    });

    it('returns null for missing values', async () => {
        const accessToken = 'hello';
        const user = await User.query().insert({email: 'test@test.com', password: 'hunter1', accessToken});

        expect(user.decryptTokens()).toMatchObject({accessToken, refreshToken: null});
    });
});
