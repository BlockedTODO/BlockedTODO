import express from 'express';
import {requireAuth, passport} from '../middleware/index.js';

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

authRouter.get('/github', passport.authenticate('github'));

authRouter.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect(req.headers.referer);
});

export default authRouter;
