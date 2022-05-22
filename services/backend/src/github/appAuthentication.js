import {createAppAuth} from '@octokit/auth-app';
import {config, logger} from '../utils/index.js';

const {appId, appPrivateKey: privateKey, clientId, clientSecret} = config.github;

const auth = createAppAuth({
    appId,
    privateKey,
    clientId,
    clientSecret,
    log: logger,
});

export default auth;
