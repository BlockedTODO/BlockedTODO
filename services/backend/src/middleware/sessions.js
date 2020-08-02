const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');
const {knex} = require('db/');

const sessions = () => {
    const KnexSessionStore = connectSessionKnex(session);
    const store = new KnexSessionStore({knex, tablename: 'sessions', sidfieldname: 'session_id'});

    return session({
        name: 'session_id',
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: true,
        rolling: true, // Automatically extends the session age on each request.
        cookie: {
            httpOnly: true,
            maxAge: 20 * 60 * 1000, // 20 minutes
            // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
            // domain: 'your.domain.com',
            // recommended you use this setting in production if your site is published using HTTPS
            // secure: true,
        },
        store,
    });
};

module.exports = sessions;
