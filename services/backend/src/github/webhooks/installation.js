const {Repository} = require('db/');
const scanGithubRepository = require('github/scanGithubRepository');

const onInstallationCreated = async ({payload}) => {
    const installationId = payload.installation.id.toString();

    await Promise.allSettled(payload.repositories.map(async ({node_id: nodeId}) => {
        const repository = await Repository.query().findOrInsert({nodeId, installationId});
        await scanGithubRepository(repository);
    }));
};

const onInstallationDeleted = async ({payload}) => {
    for (const {node_id: nodeId} of payload.repositories) {
        await Repository.query().delete().where({nodeId});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    const installationId = payload.installation.id.toString();

    await Promise.allSettled(payload.repositories_added.map(async ({node_id: nodeId}) => {
        const repository = await Repository.query().findOrInsert({nodeId, installationId});
        await scanGithubRepository(repository);
    }));
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: nodeId} of payload.repositories_removed) {
        await Repository.query().delete().where({nodeId});
    }
};

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
