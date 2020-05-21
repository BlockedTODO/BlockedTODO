const taskQueries = {
    tasks: (parent, args, {Task}, info) => Task.query()
};

const taskMutations = {
    createTask: async (parent, {taskInput}, {Task, Repository, Issue}, info) => {
        const {url, repositoryId, issueId} = taskInput;
        const [repository, issue] = await Promise.all([
            Repository.query().findById(repositoryId),
            Issue.query().findById(issueId),
        ]);

        return await Task.query().insert({url: url, repositoryId: repository.id, issueId: issue.id});
    }
};

module.exports = {
    taskQueries,
    taskMutations,
};
