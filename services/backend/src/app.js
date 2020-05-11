const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const {Repository} = require('db/models');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Repository {
            id: ID!
            url: String!
        }

        input RepositoryInput {
            url: String!
        }

        type RootQuery {
            repositories: [Repository!]!
        }

        type RootMutation {
            createRepository(repositoryInput: RepositoryInput): Repository
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
            console.log(repositoryInput);
            return await Repository.create({url: repositoryInput.url});
        }
    },
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send("Hello world");
});

app.listen(3000);
