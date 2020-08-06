const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: GitHubStrategy} = require('passport-github');
const cryptoRandomString = require('crypto-random-string');
const {AuthenticationError} = require('utils/errors');
const {User} = require('db/');

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
    console.log('IN LOCALVERIFY');
    try {
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
const gitHubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
};
const gitHubVerify = async (accessToken, refreshToken, profile, done) => {
    const {email, node_id: hostId} = profile._json;

    try {
        let user = await User.query().findOne({hostId});

        if (user) { // User exists. Update tokens.
            user.$query().patch({accessToken, refreshToken});
        } else { // User does not exist. Create one.
            // Generate a random password. Users can use the (unimplemented) password reset flow to change the password.
            const randomPassword = cryptoRandomString({length: 64});
            user = await User.query().insert({password: randomPassword, email, hostId, accessToken, refreshToken});
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};
const gitHubStrategy = new GitHubStrategy(gitHubConfig, gitHubVerify);
passport.use(gitHubStrategy);

module.exports = passport;
