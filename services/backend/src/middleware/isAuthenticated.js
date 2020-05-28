const jwt = require('jsonwebtoken');
const {User} = require('db/models/');

const isAuthenticated = async (req, res, next) => {
    req.authentication = {isAuthenticated: false};

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }

    const token = authHeader.split(' ')[1]; // Authorization: Bearer <token>
    if (!token || token === '') {
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return next();
    }

    if (!decodedToken) {
        return next();
    }

    const user = await User.query().findById(decodedToken.userId);
    if (!user) {
        return next();
    }

    req.authentication = {
        isAuthenticated: true,
        user: user,
    };

    next();
};

module.exports = isAuthenticated;
