const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();

app.use(bodyParser.json());


const repositories = [];
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
        repositories: () => {
            return repositories;
        },
        createRepository: ({repositoryInput}) => {
            console.log(repositoryInput);
            const repo = {
                id: Math.random().toString(),
                url: repositoryInput.url
            };

            repositories.push(repo);

            return repo;
        }
    },
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send("Hello world");
});

app.listen(3000);
