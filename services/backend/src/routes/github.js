import express from 'express';
import {requireAuth} from '../middleware/index.js';
import {createOauthClient, getAvatarUrl} from '../github/utils/index.js';

const githubRouter = express.Router();

githubRouter.get('/avatar', requireAuth, async (req, res) => {
    const {accessToken} = req.user.decryptTokens();
    const githubClient = await createOauthClient(accessToken);

    const avatarUrl = await getAvatarUrl(githubClient, req.user.nodeId);

    res.status(200).json({avatarUrl});
});

export default githubRouter;
