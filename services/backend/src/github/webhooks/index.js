const {Webhooks} = require('@octokit/webhooks');
const {onInstallationCreated, onInstallationDeleted,
    onInstallationRepositoriesAdded, onInstallationRepositoriesRemoved} = require('./installation');
const {onPush} = require('./push');
const {onIssueCommentCreated} = require('./issue');

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path: '/github_event_handler',
});

webhooks.on('*', ({id, name, payload}) => {
    console.log(name, 'event received');
});

webhooks.on('installation.created', onInstallationCreated);
webhooks.on('installation.deleted', onInstallationDeleted);
webhooks.on('installation_repositories.added', onInstallationRepositoriesAdded);
webhooks.on('installation_repositories.removed', onInstallationRepositoriesRemoved);
webhooks.on('push', onPush);
webhooks.on('issue_comment.created', onIssueCommentCreated);

module.exports = webhooks;
