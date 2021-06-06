import {ApolloServer, gql} from 'apollo-server-express';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import knex, * as models from '../db/index.js';

const playground = {
    settings: {'editor.cursorShape': 'line'}
};

const context = ({req}) => {
    return {
        knex,
        ...models,
        request: req,
    };
};

const apolloServer = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: context,
    playground,
});

export default apolloServer;
