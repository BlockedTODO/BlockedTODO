const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apolloServer = require('graphql/apolloServer');
const {isAuthenticated, errorHandler} = require('middleware/');
const githubWebhooks = require('github/webhooks');

const app = express();

app.set('host', process.env.DOMAIN_NAME || 'localhost');
app.set('port', process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // eslint-disable-line
app.use(isAuthenticated);
app.use(githubWebhooks.middleware);

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
    res.send('BlockedTODO Backend Server');
});

app.use(errorHandler);

/* This applyMiddleware call must be the last registered middleware
 * BlockedTODO: https://github.com/apollographql/apollo-server/milestone/16
 * Upgrade apollo-server and add after-request middleware (eg. 404 handlers) when version 3.0.0 is released */
if (process.env.GRAPHQL_API_ENABLED === 'true') {
    apolloServer.applyMiddleware({app});
}

module.exports = app;
