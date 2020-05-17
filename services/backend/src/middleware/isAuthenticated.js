const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
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
    } catch(error) {
        return next();
    }

    if (!decodedToken) {
        return next();
    }

    req.authentication = {
        isAuthenticated: true,
        userId: decodedToken.userId,
    };

    next();
};

module.exports = isAuthenticated;
