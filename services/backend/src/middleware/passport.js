const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
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

module.exports = passport;
