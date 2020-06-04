const {Webhooks} = require('@octokit/webhooks');
const axios = require('axios');
const app = require('./app');
const {Repository, User} = require('db/models');
const {findOrCreate} = require('db/utils/');

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path: '/github_event_handler',
});

webhooks.on('*', ({id, name, payload}) => {
    console.log(name, 'event received');
});

webhooks.on('installation.created', async ({payload}) => {
    const repositoryUrls = payload.repositories.map((repo) => `https://github.com/${repo.full_name}`);

    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const repositoryUrl of repositoryUrls) {
        const repository = await findOrCreate(Repository, {url: repositoryUrl});

        // In the future, users will be created when they "Sign in with GitHub" on the website
        await repository.$relatedQuery('users').relate([user0]);
    }

    // Run initial scan
});

webhooks.on('installation.deleted', async ({payload}) => {
    /* BlockedTODO: https://github.community/t/116562
    * installation.deleted payload does not contain a repositories array.
    * Add installation.deleted implementation when above topic has a response */
    if (!payload.repositories) {
        return;
    }

    const repositoryUrls = payload.repositories.map((repo) => `https://github.com/${repo.full_name}`);

    for (const repositoryUrl of repositoryUrls) {
        await Repository.query().delete().where({url: repositoryUrl});
    }
});

webhooks.on('installation_repositories.removed', ({payload}) => {
    const repositoryUrls = payload.repositories_removed.map((repo) => `https://github.com/${repo.full_name}`);

    for (const repositoryUrl of repositoryUrls) {
        await Repository.query().delete().where({url: repositoryUrl});
    }
});

webhooks.on('installation_repositories.added', async ({payload}) => {
    const repositoryUrls = payload.repositories_added.map((repo) => `https://github.com/${repo.full_name}`);

    // Associate all repositories with user0 for dev testing
    const user0 = await User.query().findOne({email: 'test0@test.com'});

    for (const repositoryUrl of repositoryUrls) {
        const repository = await findOrCreate(Repository, {url: repositoryUrl});

        // In the future, users will be created when they "Sign in with GitHub" on the website
        await repository.$relatedQuery('users').relate([user0]);
    }

    // Run initial scan
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
