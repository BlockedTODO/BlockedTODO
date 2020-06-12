const {Repository, User} = require('db/models');
const {findOrCreate} = require('db/utils/');
const {createAppClient, downloadAndScan} = require('github/utils/');

const onInstallationCreated = async ({payload}) => {
    const githubClient = await createAppClient(payload.installation.id);

    await Promise.allSettled(payload.repositories.map(({node_id}) => {
        createAndScanRepository(node_id, githubClient);
    }));
};

const onInstallationDeleted = async ({payload}) => {
    /* BlockedTODO: https://github.community/t/116562
     * installation.deleted payload does not contain a repositories array.
     * Add installation.deleted implementation when the API is updated. */
    if (!payload.repositories) {
        return;
    }

    for (const {node_id: hostId} of payload.repositories) {
        await Repository.query().delete().where({host: 'github', hostId: hostId});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    const githubClient = await createAppClient(payload.installation.id);

    await Promise.allSettled(payload.repositories_added.map(({node_id}) => {
        createAndScanRepository(node_id, githubClient);
    }));
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories_added) {
        await Repository.query().delete().where({host: 'github', hostId: hostId});
    }
};

const createAndScanRepository = async (repositoryHostId, githubClient) => {
    await findOrCreate(Repository, {host: 'github', hostId: repositoryHostId});
    await downloadAndScan(githubClient, repositoryHostId);
}

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
