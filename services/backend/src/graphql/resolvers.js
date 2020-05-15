module.exports = {
    User: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    Repository: {
        users: (parent, args, context, info) => parent.getUsers()
    },
    Issue: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    Task: {
        repository: (parent, args, context, info) => parent.getRepository(),
        issue: (parent, args, context, info) => parent.getIssue(),
    },
    RootQuery: {
        users: (parent, args, {User}, info) => User.findAll(),
        repositories: (parent, args, {Repository}, info) => Repository.findAll(),
        issues: (parent, args, {Issue}, info) => Issue.findAll(),
        tasks: (parent, args, {Task}, info) => Task.findAll(),
    },
    RootMutation: {
        createUser: async (parent, {userInput}, {User}, info) => {
            return await User.create({
                email: userInput.email,
                password: userInput.password
            });
        },
        createRepository: async (parent, {repositoryInput}, {Repository}, info) => {
            const [repository, created] = await Repository.findOrCreate({
                where: {url: repositoryInput.url}
            });

            return repository;
        },
        createIssue: async (parent, {issueInput}, {Issue}, info) => {
            const [issue, created] = await Issue.findOrCreate({
                where: {url: issueInput.url}
            });

            return issue;
        },
        createTask: async (parent, {taskInput}, {Task}, info) => {
            return await Task.create({url: taskInput.url});
        }
    }
};
