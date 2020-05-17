const repositoryQueries = {
    repositories: (parent, args, {Repository}, info) => Repository.findAll()
};

const repositoryMutations = {
    createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
        const [repository, _created] = await Repository.findOrCreate({
            where: {url: repositoryInput.url}
        });

        return repository;
    }
};

module.exports = {
    repositoryQueries,
    repositoryMutations,
};
