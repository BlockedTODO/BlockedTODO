module.exports = {
    User: {
        repositories: (parent, args, context, info) => parent.getRepositories()
    },
    Repository: {
        users: (parent, args, context, info) => parent.getUsers(),
        issues: (parent, args, context, info) => parent.getIssues(),
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
        createIssue: async (parent, {issueInput}, {Issue, Repository, sequelize}, info) => {
            const transaction = await sequelize.transaction();
            try {
                const repository = await Repository.findByPk(issueInput.repositoryId);
                const [issue, created] = await Issue.findOrCreate({
                    where: {url: issueInput.url}
                });

                await issue.addRepository(repository);
                transaction.commit();

                return issue;
            } catch(e) {
                transaction.rollback();
            }
        },
        createTask: async (parent, {taskInput}, {Task, Repository, Issue}, info) => {
            const {url, repositoryId, issueId} = taskInput;
            const [repository, issue] = await Promise.all([Repository.findByPk(repositoryId), Issue.findByPk(issueId)]);
            console.log(repository.id);
            console.log(issue.id);

            return await Task.create({url: url, repositoryId: repository.id, issueId: issue.id});
        }
    }
};
