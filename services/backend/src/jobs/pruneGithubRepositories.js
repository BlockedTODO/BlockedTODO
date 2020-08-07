const {Repository} = require('db/');
const {logger} = require('utils/');
const {createAppClient, createInstallationClient} = require('github/utils');

/*
 * This job queries the GitHub API and deletes repositories where BlockedTODO isn't installed from the database.
 * This could happen if the backend server went down while BlockedTODO was being uninstalled, for instance.
 *
 * First, it fetches all installations of the GitHub app.
 * For each installation, it gets from GitHub the repositories on which the app is installed.
 * We create a set of valid repository hostIds. Any repo with a hostId that is not in the set gets deleted.
 *
 * Note: this does not lock the database, so there is theoretically a race condition
 * if a repository is added between checking the list of repositories and querying all repositories from the database.
 *
 * Unfortunately, this cannot be done with the GitHub GraphQL API at the moment:
 * https://github.community/t/get-installation-id-with-graphql/13881
 *
 * So we use the (v3) REST API:
 * https://docs.github.com/en/rest/reference/apps#list-repositories-accessible-to-the-app-installation
 *
 */
const addGithubInstallationIds = async () => {
    const appClient = await createAppClient();
    const validHostIds = new Set();

    // Get all installations
    const installationsResponse = await appClient.get('/app/installations');

    // For each installation, get all repositories
    for (const installation of installationsResponse.data) {
        const installationClient = await createInstallationClient(installation.id);
        const repositoriesResponse = await installationClient.get('/installation/repositories');

        // For each repository, add its hostId to the set
        for (const {node_id: hostId} of repositoriesResponse.data.repositories) {
            validHostIds.add(hostId);
        }
    }

    // Remove repositories with a hostId that is not in the set
    const repositories = await Repository.query().where({host: 'github'});
    for (const repository of repositories) {
        if (validHostIds.has(repository.hostId)) {
            continue;
        }

        logger.info(`Deleting repository ${repository.id} with hostId ${repository.hostId}`);
        await repository.$query().delete();
    }

    return 'success';
};

const onSuccess = (result) => {
    logger.info(result);
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error(error.message);
    process.exit(1); // Error exit code
};

// Run code synchronously to ensure proper process error codes are returned.
addGithubInstallationIds().then(onSuccess).catch(onError);
