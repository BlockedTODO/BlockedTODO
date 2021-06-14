import {logger} from '../../utils/index.js';
import {Webhooks} from '@octokit/webhooks';
import {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
} from './installation.js';
import {onPush} from './push.js';

const webhooks = new Webhooks({
    secret: process.env.GITHUB_WEBHOOKS_SECRET
});

webhooks.onAny(({id, name, payload}) => {
    logger.info(`${name} event received`);
});

webhooks.onError((error) => {
    logger.error(error.stack);
});

webhooks.on('installation.created', onInstallationCreated);
webhooks.on('installation.deleted', onInstallationDeleted);
webhooks.on('installation_repositories.added', onInstallationRepositoriesAdded);
webhooks.on('installation_repositories.removed', onInstallationRepositoriesRemoved);
webhooks.on('push', onPush);

export default webhooks;
