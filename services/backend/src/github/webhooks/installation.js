import {Repository} from '../../db/index.js';
import scanGithubRepository from '../scanGithubRepository.js';

export const onInstallationCreated = async ({payload}) => {
    const installationId = payload.installation.id;

    await Promise.allSettled(payload.repositories.map(async ({node_id: nodeId}) => {
        const repository = await Repository.query().findOrInsert({nodeId, installationId});
        await scanGithubRepository(repository);
    }));
};

export const onInstallationDeleted = async ({payload}) => {
    for (const {node_id: nodeId} of payload.repositories) {
        await Repository.query().delete().where({nodeId});
    }
};

export const onInstallationRepositoriesAdded = async ({payload}) => {
    const installationId = payload.installation.id;

    await Promise.allSettled(payload.repositories_added.map(async ({node_id: nodeId}) => {
        const repository = await Repository.query().findOrInsert({nodeId, installationId});
        await scanGithubRepository(repository);
    }));
};

export const onInstallationRepositoriesRemoved = async ({payload}) => {
    for (const {node_id: nodeId} of payload.repositories_removed) {
        await Repository.query().delete().where({nodeId});
    }
};
