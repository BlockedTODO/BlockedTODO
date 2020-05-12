const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const {Repository, User} = require('db/models');

const app = express();

app.use(bodyParser.json());

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

app.get('/', (req, res, next) => {
    res.send("Hello world");
});

app.listen(3000);
