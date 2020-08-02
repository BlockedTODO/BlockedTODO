const errorHandler = require('./errorHandler');
const requireAuth = require('./requireAuth');
const passport = require('./passport');
const sessions = require('./sessions');

module.exports = {
    errorHandler,
    requireAuth,
    passport,
    sessions,
};
