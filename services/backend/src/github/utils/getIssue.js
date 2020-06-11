const {URL} = require('url');
const {graphqlRequestBody} = require('utils/');

const PATHNAME_REGEX = /\/(?<owner>.+)\/(?<name>.+)\/issues\/(?<issueNumber>\d+)/;

/* Get issue data from GitHub.
 * This call will fail if the issue was transferred.
 * BlockedTODO: https://github.community/t/117585
 * Implement solution or workaround depending on response. */
const getIssue = async (githubClient, issue) => {
    // Parse issue URL
    const issueUrl = new URL(issue.url);
    const match = [...issueUrl.pathname.matchAll(PATHNAME_REGEX)];
    const {owner, name, issueNumber} = match[0].groups;

    const getIssue = graphqlRequestBody(`
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
    const response = await githubClient.post('/graphql', getIssue);
    return response.data.data.repository.issue;
};

module.exports = getIssue;
