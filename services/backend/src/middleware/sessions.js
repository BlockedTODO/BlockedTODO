import session from 'express-session';
import connectSessionKnex from 'connect-session-knex';
import knex from '../db/index.js';
import {config} from '../utils/index.js';

const sessions = () => {
    const KnexSessionStore = connectSessionKnex(session);
    const store = new KnexSessionStore({knex, tablename: 'sessions', sidfieldname: 'session_id'});

    return session({
        name: 'session_id',
        secret: config.encryptionSecret,
        resave: false, // Don't resave the session if it was not changed
        saveUninitialized: false,
        rolling: true, // Automatically extends the session age on each request.
        cookie: {
            httpOnly: true,
            maxAge: 20 * 60 * 1000, // 20 minutes
            //TODO: I think this next line is causing issues in production
            secure: config.environment === 'production', // Only allow https connections in production
        },
        store,
    });
};

export default sessions;
