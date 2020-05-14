const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const {logger} = require("utils/");
const {Repository, User, sequelize} = require('db/models');

const app = express();

app.set('host', process.env.DOMAIN_NAME || 'localhost');
app.set('port', process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')); // eslint-disable-line

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Repository {
            id: ID!
            url: String!
        }

        type User {
            id: ID!
            email: String!
            password: String
        }

        input RepositoryInput {
            url: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            repositories: [Repository!]!
            users: [User!]!
        }

        type RootMutation {
            createRepository(repositoryInput: RepositoryInput): Repository
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        repositories: async () => {
            return await Repository.findAll();
        },
        createRepository: async ({repositoryInput}) => {
            return await Repository.create({url: repositoryInput.url});
        },
        users: async() => {
            return await User.findAll();
        },
        createUser: async ({userInput}) => {
            return await User.create({
                email: userInput.email,
                password: userInput.password
            });
        }
    },
    graphiql: true
}));

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
    res.send('Hello world');
});

module.exports = app;
