const jwt = require('jsonwebtoken');

const authenticationQueries = {
    login: async (parent, {authenticationInput}, {User}, info) => {
        const user = await User.query().findOne({email: authenticationInput.email});
        if (!user) {
            throw new Error('User does not exist');
        }

        if (!await user.verifyPassword(authenticationInput.password)) {
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
        };
    }
};

module.exports = {
    authenticationQueries
};
