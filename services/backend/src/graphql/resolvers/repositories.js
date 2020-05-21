const repositoryQueries = {
    repositories: (parent, args, {Repository}, info) => Repository.query()
};

const repositoryMutations = {
    createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
        const repository = await Repository.transaction(async (_tx) => { // find or create
            let repository = await Repository.query().findOne({url: repositoryInput.url});

            if (repository) { // repository is found, return it
                return repository;
            }

            try { // repository is not found, try to create it
                repository = await Repository.query().insert({url: repositoryInput.url});
                repository.$relatedQuery('repositories').relate(repository);
            } catch (error) {
                if (error.name && error.name === 'UniqueViolationError') { // in case there was a race condition
                    repository = await Repository.query().findOne({url: repositoryInput.url});
                }
            }
        });

        return repository;
    }
};

module.exports = {
    repositoryQueries,
    repositoryMutations,
};
