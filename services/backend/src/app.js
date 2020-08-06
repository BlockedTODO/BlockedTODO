const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const apolloServer = require('graphql/apolloServer');
const {errorHandler, passport, sessions} = require('middleware/');
const githubWebhooks = require('github/webhooks');
const {authRouter} = require('routes/');

const app = express();

app.set('host', process.env.DOMAIN_NAME || 'localhost');
app.set('port', process.env.PORT || '3000');

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
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

app.use(errorHandler);

/* This applyMiddleware call must be the last registered middleware
 * BlockedTODO: https://github.com/apollographql/apollo-server/milestone/16
 * Upgrade apollo-server and add after-request middleware (eg. 404 handlers) when version 3.0.0 is released */
if (process.env.GRAPHQL_API_ENABLED === 'true') {
    apolloServer.applyMiddleware({app});
}

module.exports = app;
