const logger = require('utils/logger');
const {Webhooks} = require('@octokit/webhooks');
const {onInstallationCreated, onInstallationDeleted,
    onInstallationRepositoriesAdded, onInstallationRepositoriesRemoved} = require('./installation');
const {onPush} = require('./push');

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path: '/github_event_handler',
});

webhooks.on('*', ({id, name, payload}) => {
    logger.info(`${name} event received`);
});

webhooks.on('error', (error) => {
    logger.error(error.stack);
});

webhooks.on('installation.created', onInstallationCreated);
webhooks.on('installation.deleted', onInstallationDeleted);
webhooks.on('installation_repositories.added', onInstallationRepositoriesAdded);
webhooks.on('installation_repositories.removed', onInstallationRepositoriesRemoved);
webhooks.on('push', onPush);

module.exports = webhooks;
