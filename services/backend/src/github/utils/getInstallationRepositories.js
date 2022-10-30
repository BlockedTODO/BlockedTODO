import {logger} from '../../utils/index.js';

/* Get list of repositories associated with an installation ID from GitHub.
 * Using this API under "list repositories accessible to the app installation":
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/apps
 *
 * This API is paged (max 100/page) so we make 1 request per page of data */
const getInstallationRepositories = async (installationClient) => {
    const RESULTS_PER_PAGE = 100; // Max allowed by GitHub
    const repositories = [];

    let response = null;
    let page = 1;

    /* Get all pages of repositories until the last one.
     *
     * If the number of repositories is a multiple of RESULTS_PER_PAGE, we end up making a query to an "empty" page
     * In that case, GitHub just returns a response where data.repositories is an empty array
     * so this edge case is not a problem. */
    do {
        const params = {per_page: RESULTS_PER_PAGE, page};
        response = await installationClient.get('/installation/repositories', {params});
        logger.info(`Response from GitHub: ${response.status}`, {response});

        repositories.push(...response.data.repositories);

        page += 1;
    } while (response.data.repositories.length === RESULTS_PER_PAGE);

    logger.info(`Found ${repositories.length} repositories for this installation`, {repositories});

    return repositories;
};

export default getInstallationRepositories;
