const express = require('express');
const {requireAuth, passport} = require('middleware/');

const authRouter = express.Router();

authRouter.get('/status', (req, res) => {
    res.status(200).json({isLoggedIn: req.isAuthenticated()});
});

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({message: 'success'});
});

authRouter.post('/logout', requireAuth, (req, res) => {
    req.logout();
    res.status(200).json({message: 'success'});
});

module.exports = authRouter;
