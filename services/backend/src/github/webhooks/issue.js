const axios = require('axios');
const app = require('github/app');

const onIssueCommentCreated = async ({payload}) => {
    const installationId = payload.installation.id;
    const repositoryId = payload.repository.node_id;
    const installationAccessToken = await app.getInstallationAccessToken({
        installationId,
    });
    const data = {
        'query':`
            mutation {
                createIssue(input: {repositoryId: "${repositoryId}", title: "Auto-generated issue (using code!)"}) {
                    issue {
                        id
                        bodyText
                    }
                }
            }
        `,
        'variables': {}
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${installationAccessToken}`,
    };

    try {
        const response = await axios.post('https://api.github.com/graphql', data, {headers: headers});
        console.dir(response);
    } catch (e) {
        console.dir(e.response);
    }
};

module.exports = {onIssueCommentCreated};
