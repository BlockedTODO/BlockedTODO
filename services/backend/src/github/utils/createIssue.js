const {URL} = require('url');
const {logger, graphqlRequestBody, markdownHelpers} = require('utils/');

const {inlineCode, codeBlock, lineBreak} = markdownHelpers;

const generateIssueBody = (issue, issueReferences) => {
    let body = `Link to closed issue: ${issue.url}\n\n`;
    if (issueReferences.length === 1) {
        const {file, comment} = issueReferences[0];
        body += `This issue was automatically triggered by the following comment in ${inlineCode(file)}.\n`;
        body += codeBlock(comment);
    } else {
        body += 'This issue was automatically triggered by the following comments.\n';
        for (const {file, comment} of issueReferences) {
            body += lineBreak();
            body += `In ${inlineCode(file)}:\n`;
            body += codeBlock(comment);
        }
    }

    return body;
};

/* Create issue on GitHub (in the context of BlockedTODO: a task) */
const createIssue = async (githubClient, issue, repository, issueReferences) => {
    const body = generateIssueBody(issue, issueReferences);
    const issueUrl = new URL(issue.url);

    const createIssue = graphqlRequestBody(`
        mutation {
            createIssue(input:{
                repositoryId: "${repository.nodeId}",
                title: "Unblocked TODO: ${issueUrl.pathname} was closed.",
                body: "${body.replace(/"/g, '\\"')}"
            }) {
                issue {
                    id
                }
            }
        }
    `);

    const response = await githubClient.post('/graphql', createIssue);
    logger.info(`Response from GitHub: ${response.status}`);

    return response.data.data.createIssue.issue;
};

module.exports = createIssue;
