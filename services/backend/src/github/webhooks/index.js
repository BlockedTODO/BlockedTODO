import {config, logger} from '../../utils/index.js';
import {Webhooks} from '@octokit/webhooks';
import {
    onInstallationCreated,
    onInstallationDeleted,
    onInstallationRepositoriesAdded,
    onInstallationRepositoriesRemoved,
} from './installation.js';
import {onPush} from './push.js';

const webhooks = new Webhooks({
    secret: config.github.webhooksSecret
});

webhooks.onAny(({id, name, payload}) => {
    logger.info(`${name} event received`);
});

webhooks.onError((error) => {
    logger.error('Encountered GitHub webhook error', {error});
});

webhooks.on('installation.created', onInstallationCreated);
webhooks.on('installation.deleted', onInstallationDeleted);
webhooks.on('installation_repositories.added', onInstallationRepositoriesAdded);
webhooks.on('installation_repositories.removed', onInstallationRepositoriesRemoved);
webhooks.on('push', onPush);

export default webhooks;
