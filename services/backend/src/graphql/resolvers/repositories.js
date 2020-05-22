const {findOrCreate} = require('db/utils/');

const repositoryQueries = {
    repositories: (parent, args, {Repository}, info) => Repository.query()
};

const repositoryMutations = {
    createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
        return await findOrCreate(Repository, repositoryInput);
    }
};

module.exports = {
    repositoryQueries,
    repositoryMutations,
};
