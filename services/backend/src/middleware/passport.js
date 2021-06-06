import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GithubStrategy} from 'passport-github';
import cryptoRandomString from 'crypto-random-string';
import {AuthenticationError} from '../utils/errors.js';
import {User} from '../db/index.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.query().findOne({id: userId});
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Local (username-password) Strategy
const localConfig = {
    usernameField: 'email',
    passwordField: 'password',
};
const localVerify = async (email, password, done) => {
    try {
        if (!email) {
            throw new AuthenticationError('Email is required');
        }

        const user = await User.query().findOne({email});

        if (!user) {
            throw new AuthenticationError('User does not exist');
        }

        if (!await user.verifyPassword(password)) {
            throw new AuthenticationError('Password is incorrect');
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};
const localStrategy = new LocalStrategy(localConfig, localVerify);
passport.use(localStrategy);

// GitHub IdP Strategy
const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
};
const githubVerify = async (accessToken, refreshToken, profile, done) => {
    const {email, node_id: nodeId} = profile._json;

    try {
        let user = await User.query().findOne({nodeId});

        if (user) { // User exists. Update tokens.
            await user.$query().patch({accessToken, refreshToken});
        } else { // User does not exist. Create one.
            // Generate a random password. Users can use the (unimplemented) password reset flow to change the password.
            const randomPassword = cryptoRandomString({length: 64});
            user = await User.query().insert({password: randomPassword, email, nodeId, accessToken, refreshToken});
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};
const githubStrategy = new GithubStrategy(githubConfig, githubVerify);
passport.use(githubStrategy);

export default passport;
