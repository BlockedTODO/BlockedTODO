const {Repository, User} = require('db/models');
const {findOrCreate} = require('db/utils/');

const onInstallationCreated = async ({payload}) => {
    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const {node_id: hostId} of payload.repositories) {
        await findOrCreate(Repository, {host: 'github', hostId: hostId}, async (repository) => {
            // In the future, users will be created when they "Sign in with GitHub" on the website
            await repository.$relatedQuery('users').relate([user0]);
        });
    }

    // Run initial scan
};

const onInstallationDeleted = async ({payload}) => {
    /* BlockedTODO: https://github.community/t/116562
    * installation.deleted payload does not contain a repositories array.
    * Add installation.deleted implementation when above topic has a response */
    if (!payload.repositories) {
        return;
    }

    for (const {node_id: hostId} of payload.repositories) {
        await Repository.query().delete().where({host: 'github', hostId: hostId});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const {node_id: hostId} of payload.repositories_added) {
        await findOrCreate(Repository, {host: 'github', hostId: hostId}, async (repository) => {
            // In the future, users will be created when they "Sign in with GitHub" on the website
            await repository.$relatedQuery('users').relate([user0]);
        });
    }

    // Run initial scan
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories_added) {
        await Repository.query().delete().where({host: 'github', hostId: hostId});
    }
};

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
