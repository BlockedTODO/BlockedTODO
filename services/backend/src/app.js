const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            repositories: [String!]!
        }

        type RootMutation {
            createRepository(url: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        repositories: () => {
            return ['https://github.com/blockedtodo/blockedtodo', 'https://github.com/dominicroystang/uvindex/']
        },
        createRepository: ({url}) => {
            return url
        }
    },
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send("Hello world");
});

app.listen(3000);
