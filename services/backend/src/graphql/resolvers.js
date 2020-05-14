module.exports = {
    Repository: {
        users: (parent, args, context, info) => parent.getUsers()
    },
    User: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    RootQuery: {
        repositories: (parent, args, {Repository}, info) => Repository.findAll(),
        users: (parent, args, {User}, info) => User.findAll(),
    },
    RootMutation: {
        createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
            return await Repository.create({url: repositoryInput.url});
        },
        createUser: async (parent, {userInput}, {User}, info) => {
            return await User.create({
                email: userInput.email,
                password: userInput.password
            });
        }
    }
};
