const {Repository, User} = require('db/models');
const {findOrCreate} = require('db/utils/');

const onInstallationCreated = async ({payload}) => {
    const repositoryUrls = payload.repositories.map((repo) => `https://github.com/${repo.full_name}`);

    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const repositoryUrl of repositoryUrls) {
        const repository = await findOrCreate(Repository, {url: repositoryUrl});

        // In the future, users will be created when they "Sign in with GitHub" on the website
        await repository.$relatedQuery('users').relate([user0]);
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

    const repositoryUrls = payload.repositories.map((repo) => `https://github.com/${repo.full_name}`);

    for (const repositoryUrl of repositoryUrls) {
        await Repository.query().delete().where({url: repositoryUrl});
    }
};

const onInstallationRepositoriesAdded = async ({payload}) => {
    const repositoryUrls = payload.repositories_added.map((repo) => `https://github.com/${repo.full_name}`);

    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const repositoryUrl of repositoryUrls) {
        const repository = await findOrCreate(Repository, {url: repositoryUrl});

        // In the future, users will be created when they "Sign in with GitHub" on the website
        await repository.$relatedQuery('users').relate([user0]);
    }

    // Run initial scan
};

const onInstallationRepositoriesRemoved = async ({payload}) => {
    const repositoryUrls = payload.repositories_removed.map((repo) => `https://github.com/${repo.full_name}`);

    for (const repositoryUrl of repositoryUrls) {
        await Repository.query().delete().where({url: repositoryUrl});
    }
};

module.exports = {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
};
