const express = require('express');
const {requireAuth} = require('middleware/');
const {createOauthClient, getAvatarUrl} = require('github/utils');

const githubRouter = express.Router();

githubRouter.get('/avatar', requireAuth, async (req, res) => {
    const {accessToken} = req.user.decryptTokens();
    const githubClient = await createOauthClient(accessToken);

    const avatarUrl = await getAvatarUrl(githubClient, req.user.nodeId);

    res.status(200).json({avatarUrl});
});

module.exports = githubRouter;
