const {Repository} = require('db/models');
const {findOrCreate} = require('db/utils/');
const {createAppClient, downloadRepository} = require('github/utils/');
const {scanCodebase} = require('parser/');
const {logger, withTempDirectory} = require('utils/');

const onInstallationCreated = async ({payload}) => {
    const githubClient = await createAppClient(payload.installation.id);

    await Promise.allSettled(payload.repositories.map(({node_id}) => {
        createAndScanRepository(node_id, githubClient);
    }));
};

const onInstallationDeleted = async ({payload}) => {
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
    for (const {node_id: hostId} of payload.repositories_removed) {
        await Repository.query().delete().where({host: 'github', hostId: hostId});
    }
};

const createAndScanRepository = async (repositoryHostId, githubClient) => {
    const repository = await findOrCreate(Repository, {host: 'github', hostId: repositoryHostId});

    await withTempDirectory(async (tempDir) => {
        logger.info(`Downloading GitHub repository ${repository.id}`);
        const codeFolder = await downloadRepository(githubClient, repository.hostId, tempDir);
        logger.info(`Repository ${repository.id} successfully downloaded into ${codeFolder}`);

        logger.info(`Beginning codebase scan on repository ${repository.id}`);
        await scanCodebase(codeFolder, repository, githubClient);
        logger.info(`Repository ${repository.id} scan completed`);
    });
};

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
