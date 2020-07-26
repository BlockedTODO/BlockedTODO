const {Repository} = require('db/models');
const {createInstallationClient, downloadRepository} = require('github/utils/');
const {scanCodebase} = require('parser/');
const {logger, withTempDirectory} = require('utils/');

const onInstallationCreated = async ({payload}) => {
    const installationId = payload.installation.id.toString();
    const githubClient = await createInstallationClient(installationId);

    await Promise.allSettled(payload.repositories.map(({node_id}) => {
        createAndScanRepository(node_id, installationId, githubClient);
    }));
};

const onInstallationDeleted = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories) {
        await Repository.query().delete().where({host: 'github', hostId});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    const installationId = payload.installation.id.toString();
    const githubClient = await createInstallationClient(installationId);

    await Promise.allSettled(payload.repositories_added.map(({node_id}) => {
        createAndScanRepository(node_id, installationId, githubClient);
    }));
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: hostId} of payload.repositories_removed) {
        await Repository.query().delete().where({host: 'github', hostId});
    }
};

const createAndScanRepository = async (hostId, installationId, githubClient) => {
    const repository = await Repository.query().findOrInsert({host: 'github', hostId, installationId});

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
