const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');
const {knex} = require('db/');

const environment = process.env.NODE_ENV || 'development';

const sessions = () => {
    const KnexSessionStore = connectSessionKnex(session);
    const store = new KnexSessionStore({knex, tablename: 'sessions', sidfieldname: 'session_id'});

    return session({
        name: 'session_id',
        secret: process.env.TOKEN_SECRET,
        resave: false, // Don't resave the session if it was not changed
        saveUninitialized: false,
        rolling: true, // Automatically extends the session age on each request.
        cookie: {
            httpOnly: true,
            maxAge: 20 * 60 * 1000, // 20 minutes
            secure: environment === 'production', // Only allow https connections in production
        },
        store,
    });
};

module.exports = sessions;
