import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apolloServer from './graphql/apolloServer.js';
import {errorHandler, passport, sessions} from './middleware/index.js';
import githubWebhooks from './github/webhooks/index.js';
import {authRouter, githubRouter} from './routes/index.js';

const app = express();

app.set('host', process.env.DOMAIN_NAME || 'localhost');
app.set('port', process.env.PORT || '3000');

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: '10mb'}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // eslint-disable-line

app.use(cookieParser());
app.use(sessions());

app.use(passport.initialize());
app.use(passport.session());

app.use(githubWebhooks.middleware);

app.get('/', (req, res, next) => {
    res.send('BlockedTODO Backend Server');
});

app.use('/auth', authRouter);
app.use('/github', githubRouter);

app.use(errorHandler);

/* This applyMiddleware call must be the last registered middleware
 * BlockedTODO: https://github.com/apollographql/apollo-server/milestone/16
 * Upgrade apollo-server and add after-request middleware (eg. 404 handlers) when version 3.0.0 is released */
if (process.env.GRAPHQL_API_ENABLED === 'true') {
    apolloServer.applyMiddleware({app});
}

export default app;
