const {Repository} = require('db/');
const scanGithubRepository = require('github/scanGithubRepository');

const onInstallationCreated = async ({payload}) => {
    const installationId = payload.installation.id.toString();

    await Promise.allSettled(payload.repositories.map(async ({node_id: hostId}) => {
        const repository = await Repository.query().findOrInsert({host: 'github', hostId, installationId});
        await scanGithubRepository(repository);
    }));
};

const onInstallationDeleted = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories) {
        await Repository.query().delete().where({host: 'github', hostId});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    const installationId = payload.installation.id.toString();

    await Promise.allSettled(payload.repositories_added.map(async ({node_id: hostId}) => {
        const repository = await Repository.query().findOrInsert({host: 'github', hostId, installationId});
        await scanGithubRepository(repository);
    }));
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories_removed) {
        await Repository.query().delete().where({host: 'github', hostId});
    }
};

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
