const {Webhooks} = require('@octokit/webhooks');
const axios = require('axios');
const app = require('./app');

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path: '/github_event_handler',
});

webhooks.on('*', ({id, name, payload}) => {
    console.log(name, 'event received');
});

webhooks.on('issue_comment.created', async ({id, name, payload}) => {
    const installationId = payload.installation.id;
    const repositoryId = payload.repository.node_id;
    const installationAccessToken = await app.getInstallationAccessToken({
        installationId,
    });
    data = {
        "query":`
            mutation {
                createIssue(input: {repositoryId: "${repositoryId}", title: "Auto-generated issue (using code!)"}) {
                    issue {
                        id
                        bodyText
                    }
                }
            }
        `,
        "variables": {}
    };
    headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${installationAccessToken}`,
    }

    try {
        const response = await axios.post('https://api.github.com/graphql', data, {headers: headers});
        console.dir(response);
    } catch (e) {
        console.dir(e.response);
    }

});

module.exports = webhooks;
