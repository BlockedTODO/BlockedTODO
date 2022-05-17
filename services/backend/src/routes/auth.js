import express from 'express';
import {User} from '../db/index.js';
import {requireAuth, passport} from '../middleware/index.js';

const authRouter = express.Router();

authRouter.get('/status', (req, res) => {
    res.status(200).json({isLoggedIn: req.isAuthenticated()});
});

authRouter.post('/signup', async (req, res) => {
    let user = await User.query().findOne({email: req.body.email});

    if (user) {
        return res.status(400).json({message: 'User already exists with this email address'});
    }

    user = await User.query().insert({
        email: req.body.email,
        password: req.body.password
    });

    res.status(201).json({id: user.id, email: user.email});
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
    const frontendUrl = `${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`;
    res.redirect(req.header('referer') || frontendUrl);
});

export default authRouter;
