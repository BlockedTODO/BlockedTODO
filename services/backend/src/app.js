const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const isAuthenticated = require('middleware/isAuthenticated');
const apolloServer = require('graphql/apolloServer');

const app = express();
apolloServer.applyMiddleware({app});

app.set('host', process.env.DOMAIN_NAME || 'localhost');
app.set('port', process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // eslint-disable-line

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
    res.send('Hello world');
});

module.exports = app;
