import {URL} from 'url';
import {logger, graphqlRequestBody} from '../../utils/index.js';

const PATHNAME_REGEX = /\/(?<owner>.+)\/(?<name>.+)\/issues\/(?<issueNumber>\d+)/;

/* Get issue data from GitHub.
 * This call will fail if the issue was transferred.
 * BlockedTODO: https://github.community/t/117585
 * Implement solution or workaround depending on response. */
const getIssue = async (githubClient, issue) => {
    // Parse issue URL
    const issueUrl = new URL(issue.url);
    const {owner, name, issueNumber} = issueUrl.pathname.match(PATHNAME_REGEX).groups;

    const issueQuery = graphqlRequestBody(`
        query {
            repository(owner: "${owner}", name: "${name}") {
                issue(number: ${issueNumber}) {
                    title
                    closed
                }
            }
        }
    `);

    // Query issue
    const response = await githubClient.post('/graphql', issueQuery);
    logger.info(`Response from GitHub: ${response.status}`, {response});

    return response.data.data.repository.issue;
};

export default getIssue;
