const {Repository} = require('db/');
const {logger} = require('utils/');
const {createAppClient, createInstallationClient} = require('github/utils');

/*
 * This job queries the GitHub API and adds missing installation ids to repositories in the database.
 *
 * First, it fetches all installations of the GitHub app.
 * For each installation, it gets from GitHub the repositories on which the app is installed.
 * For each repository it gets from GitHub, we check if the db entry for that repository contains an installation id.
 * If there is no installation id in the database for that repository, update it to include the installation id.
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

    // Get all installations
    const installationsResponse = await appClient.get('/app/installations');

    // For each installation, get all repositories
    for (const installation of installationsResponse.data) {
        const installationClient = await createInstallationClient(installation.id);
        const repositoriesResponse = await installationClient.get('/installation/repositories');

        // For each repository, add installation id if it is missing in the database
        for (const {node_id: nodeId} of repositoriesResponse.data.repositories) {
            const repository = await Repository.query().findOne({nodeId});

            if (!repository) {
                logger.error(`Repository with nodeId ${nodeId} is missing in the database`);
                continue;
            }

            if (repository.installationId !== null) {
                continue;
            }

            await repository.$query().patch({installationId: installation.id.toString()});
            logger.info(`Updated repository ${repository.id}`);
        }
    }

    // Verify that the job worked
    const failedUpdates = await Repository.query().whereNull('installationId');
    if (failedUpdates.length !== 0) {
        logger.error('updating installation id failed for the following repositories:');
        logger.error(failedUpdates);

        throw new Error('Some repositories are still missing an installation id');
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
