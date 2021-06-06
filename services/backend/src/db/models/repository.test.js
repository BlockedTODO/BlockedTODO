import {transactionPerTest} from 'objection-transactional-tests';
import knex, {Repository} from '../index.js';

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
});

describe('insert', () => {
    it('rejects an empty node id', async () => {
        const insertQuery = Repository.query().insert({nodeId: '', installationId: 123});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty installation id', async () => {
        const insertQuery = Repository.query().insert({nodeId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects a null installation id', async () => {
        const insertQuery = Repository.query().insert({nodeId: '', installationId: null});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects a string installation id', async () => {
        const insertQuery = Repository.query().insert({nodeId: '', installationId: '123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects a negative installation id', async () => {
        const insertQuery = Repository.query().insert({nodeId: '', installationId: -123});
        await expect(insertQuery).rejects.toThrowError();
    });
});
