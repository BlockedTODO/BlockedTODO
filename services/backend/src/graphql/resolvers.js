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
        tasks: (parent, args, {Task}, info) => Task.findAll(),
    },
    RootMutation: {
        createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
            const [repository, created] = await Repository.findOrCreate({
                where: {url: repositoryInput.url}
            });

            return repository;
        },
        createUser: async (parent, {userInput}, {User}, info) => {
            return await User.create({
                email: userInput.email,
                password: userInput.password
            });
        },
        createTask: async (parent, {taskInput}, {Task}, info) => {
            const [task, created] = await Task.findOrCreate({
                where: {url: taskInput.url}
            });

            return task;
        }
    }
};
