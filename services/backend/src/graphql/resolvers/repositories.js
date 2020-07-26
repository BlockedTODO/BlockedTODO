const repositoryQueries = {
    repositories: (parent, args, {Repository}, info) => Repository.query()
};

const repositoryMutations = {
    createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
        return await Repository.query().findOrInsert(repositoryInput);
    }
};

module.exports = {
    repositoryQueries,
    repositoryMutations,
};
