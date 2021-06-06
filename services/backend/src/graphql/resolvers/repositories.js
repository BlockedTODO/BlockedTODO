export const repositoryQueries = {
    repositories: (parent, args, {Repository}, info) => Repository.query()
};

export const repositoryMutations = {
    createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
        return await Repository.query().findOrInsert(repositoryInput);
    }
};
