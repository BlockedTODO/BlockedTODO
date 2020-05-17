const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* Verifies that the provided password matches the user's password.
 * The user instance must have a password field ie. have withPassword scope
 * eg. const user = await User.scope('withPassword').findByPk(1) */
const isPasswordValid = async (user, password) => {
    /* Note: Bcrypt incorporates the salt into the hash (as plaintext). That's why the salt isn't used here.
     * The compare function pulls the salt out of the hash, then uses it to hash the password and perform the comparison.
     * Hence, we technically don't need to store the salt again in a separate column, but we do for convenience. */
    return await bcrypt.compare(password, user.password);
};

const authenticationQueries = {
    login: async (parent, {authenticationInput}, {User}, info) => {
        const user = await User.scope('withPassword').findOne({where: {email: authenticationInput.email}});
        if (user == null) {
            throw new Error('User does not exist');
        }

        if (!await isPasswordValid(user, authenticationInput.password)) {
            throw new Error('Password is incorrect');
        }

        const tokenExpiration = 1; // 1 hour
        const token = jwt.sign({userId: user.id, email: user.email}, process.env.TOKEN_SECRET, {
            expiresIn: `${tokenExpiration}h`
        });

        return {
            userId: user.id,
            token: token,
            tokenExpiration: tokenExpiration,
        }
    }
}

module.exports = {
    authenticationQueries
};
