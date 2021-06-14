import {createNodeMiddleware} from '@octokit/webhooks';
import webhooks from '../github/webhooks/index.js';
import {logger} from '../utils/index.js';

const options = {
    path: '/github_event_handler',
    log: logger,
};

const githubWebhooks = createNodeMiddleware(webhooks, options);

export default githubWebhooks;
