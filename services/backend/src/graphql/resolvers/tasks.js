const taskQueries = {
    tasks: (parent, args, {Task}, info) => Task.findAll()
};

const taskMutations = {
    createTask: async (parent, {taskInput}, {Task, Repository, Issue}, info) => {
        const {url, repositoryId, issueId} = taskInput;
        const [repository, issue] = await Promise.all([Repository.findByPk(repositoryId), Issue.findByPk(issueId)]);

        return await Task.create({url: url, repositoryId: repository.id, issueId: issue.id});
    }
};

module.exports = {
    taskQueries,
    taskMutations,
};
