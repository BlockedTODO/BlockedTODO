const {createAppClient} = require('github/utils/');
const {logger, graphqlRequestBody} = require('utils/');

const onIssueCommentCreated = async ({payload}) => {
    const github = await createAppClient(payload.installation.id);
    const repositoryId = payload.repository.node_id;

    const createIssue = graphqlRequestBody(`
        mutation {
            createIssue(input: {repositoryId: "${repositoryId}", title: "Auto-generated issue (using code!)"}) {
                issue {
                    id
                    bodyText
                }
            }
        }
    `);

    try {
        const response = await github.post('/graphql', createIssue);
        logger.info(response);
    } catch (error) {
        logger.error(error.response);
    }
};

module.exports = {onIssueCommentCreated};
