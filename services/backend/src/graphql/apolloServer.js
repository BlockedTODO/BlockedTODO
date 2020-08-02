const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('graphql/schema');
const resolvers = require('graphql/resolvers');
const db = require('db/');

const playground = {
    settings: {'editor.cursorShape': 'line'}
};

const context = ({req}) => {
    return {
        ...db,
        request: req,
    };
};

const apolloServer = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: context,
    playground,
});

module.exports = apolloServer;
