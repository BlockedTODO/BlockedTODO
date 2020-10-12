const {logger, graphqlRequestBody} = require('utils/');

// Get a url to the user's avatar
const getAvatarUrl = async (githubClient, userNodeId) => {
    const avatarUrlQuery = graphqlRequestBody(`
        query {
            node(id: "${userNodeId}") {
                ... on User {
                    avatarUrl
                }
            }
        }
    `);

    const response = await githubClient.post('/graphql', avatarUrlQuery);
    logger.info(`Response from GitHub: ${response.status}`);

    return response.data.data.node.avatarUrl;
};

module.exports = getAvatarUrl;
